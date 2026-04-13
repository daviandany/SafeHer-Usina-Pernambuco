type SignUpPayload = {
  email: string;
  password: string;
  options?: { data?: Record<string, unknown> };
};

type SignInPayload = {
  email: string;
  password: string;
};

type QueryState = {
  select?: string;
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
};

type RealtimeHandler = (payload: { new: unknown }) => void;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
}

const headers = (jwt?: string) => ({
  apikey: supabaseAnonKey,
  Authorization: `Bearer ${jwt ?? supabaseAnonKey}`,
  "Content-Type": "application/json",
});

const SESSION_KEY = "safeher_supabase_session";

const getSession = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as { access_token: string; user: { id: string; email?: string } };
};

const saveSession = (session: unknown) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

async function request<T>(path: string, init: RequestInit, jwt?: string): Promise<T> {
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      ...headers(jwt),
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = (errorBody as { msg?: string; error_description?: string }).msg
      ?? (errorBody as { error_description?: string }).error_description
      ?? "Erro na comunicação com Supabase.";
    throw new Error(message);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

class QueryBuilder {
  constructor(private readonly table: string, private readonly state: QueryState = {}) {}

  select(columns: string) {
    return new QueryBuilder(this.table, { ...this.state, select: columns });
  }

  order(column: string, options: { ascending: boolean }) {
    return new QueryBuilder(this.table, { ...this.state, orderBy: column, ascending: options.ascending });
  }

  async limit(size: number) {
    const state = { ...this.state, limit: size };
    const params = new URLSearchParams();

    if (state.select) params.set("select", state.select);
    if (state.orderBy) params.set("order", `${state.orderBy}.${state.ascending ? "asc" : "desc"}`);
    if (state.limit) params.set("limit", String(state.limit));

    const session = getSession();

    const data = await request<unknown[]>(`/rest/v1/${this.table}?${params.toString()}`, {
      method: "GET",
    }, session?.access_token);

    return { data, error: null };
  }

  async insert(payload: Record<string, unknown>) {
    try {
      const session = getSession();
      await request(`/rest/v1/${this.table}`, {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(payload),
      }, session?.access_token);

      return { error: null };
    } catch (error: unknown) {
      return { error: error as Error };
    }
  }
}

class RealtimeChannel {
  private handler: RealtimeHandler | null = null;
  private socket: WebSocket | null = null;

  constructor(private readonly name: string) {}

  on(_event: "postgres_changes", _filter: Record<string, string>, handler: RealtimeHandler) {
    this.handler = handler;
    return this;
  }

  subscribe() {
    const wsUrl = `${supabaseUrl.replace("https://", "wss://")}/realtime/v1/websocket?apikey=${supabaseAnonKey}&vsn=1.0.0`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.socket?.send(JSON.stringify({
        topic: `realtime:${this.name}`,
        event: "phx_join",
        payload: { config: { postgres_changes: [{ event: "INSERT", schema: "public", table: this.name }] } },
        ref: "1",
      }));
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as { event?: string; payload?: { data?: { record?: unknown } } };
      if (data.event === "postgres_changes" && data.payload?.data?.record && this.handler) {
        this.handler({ new: data.payload.data.record });
      }
    };

    return this;
  }

  close() {
    this.socket?.close();
  }
}

export const supabaseClient = {
  auth: {
    async signUp(payload: SignUpPayload) {
      try {
        await request("/auth/v1/signup", { method: "POST", body: JSON.stringify(payload) });
        return { error: null };
      } catch (error: unknown) {
        return { error: error as Error };
      }
    },
    async signInWithPassword(payload: SignInPayload) {
      try {
        const data = await request<{ access_token: string; user: { id: string; email?: string } }>("/auth/v1/token?grant_type=password", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        saveSession(data);
        return { data: { user: data.user }, error: null };
      } catch (error: unknown) {
        return { data: { user: null }, error: error as Error };
      }
    },
    async getUser() {
      const session = getSession();
      return { data: { user: session?.user ?? null }, error: null };
    },
    async signOut() {
      localStorage.removeItem(SESSION_KEY);
      return { error: null };
    },
  },
  from(table: string) {
    return new QueryBuilder(table);
  },
  channel(name: string) {
    return new RealtimeChannel(name);
  },
  async removeChannel(channel: RealtimeChannel) {
    channel.close();
  },
};
