import { supabaseClient } from "../../../core/config/supabaseClient";
import type { EmergencyAlert, EmergencyRepository } from "../domain/Emergency";

type EmergencyRow = {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  status: "open" | "resolved";
  created_at: string;
};

const toEntity = (row: EmergencyRow): EmergencyAlert => ({
  id: row.id,
  userId: row.user_id,
  latitude: row.latitude,
  longitude: row.longitude,
  status: row.status,
  createdAt: row.created_at,
});

export class SupabaseEmergencyRepository implements EmergencyRepository {
  async createSOS(input: { userId: string; latitude: number; longitude: number }): Promise<void> {
    const { error } = await supabaseClient.from("emergencias").insert({
      user_id: input.userId,
      latitude: input.latitude,
      longitude: input.longitude,
      status: "open",
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  subscribeToEmergencies(onAlert: (alert: EmergencyAlert) => void): () => void {
    const channel = supabaseClient
      .channel("emergencias-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "emergencias" },
        (payload) => {
          onAlert(toEntity(payload.new as EmergencyRow));
        },
      )
      .subscribe();

    return () => {
      void supabaseClient.removeChannel(channel);
    };
  }

  async listRecentEmergencies(): Promise<EmergencyAlert[]> {
    const { data, error } = await supabaseClient
      .from("emergencias")
      .select("id, user_id, latitude, longitude, status, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((item) => toEntity(item as EmergencyRow));
  }
}
