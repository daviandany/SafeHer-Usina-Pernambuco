export interface EmergencyAlert {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  status: "open" | "resolved";
  createdAt: string;
}

export interface EmergencyRepository {
  createSOS(input: { userId: string; latitude: number; longitude: number }): Promise<void>;
  subscribeToEmergencies(onAlert: (alert: EmergencyAlert) => void): () => void;
  listRecentEmergencies(): Promise<EmergencyAlert[]>;
}
