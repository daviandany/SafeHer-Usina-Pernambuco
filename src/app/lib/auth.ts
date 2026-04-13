import { authService } from "../core/config/services";

type RegisterInput = {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
};

type RegisterResult =
  | { ok: true }
  | { ok: false; error: string };

type LoginResult =
  | { ok: true; user: { id: string; email: string; fullName: string } }
  | { ok: false; error: string };

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  try {
    await authService.signUp(input);
    return { ok: true };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : "Falha ao criar conta." };
  }
}

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    const user = await authService.signIn({ email, password });
    return {
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.email,
      },
    };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : "Falha no login." };
  }
}

export async function getCurrentUser() {
  return authService.getCurrentUser();
}

export async function findUserByEmail(email: string) {
  const user = await getCurrentUser();
  if (!user) return null;
  return user.email === email ? user : null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user);
}
