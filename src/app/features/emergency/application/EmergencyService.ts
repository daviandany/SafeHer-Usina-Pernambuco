import type { EmergencyAlert, EmergencyRepository } from "../domain/Emergency";

export class EmergencyService {
  constructor(private readonly repository: EmergencyRepository) {}

  createSOS(input: { userId: string; latitude: number; longitude: number }): Promise<void> {
    return this.repository.createSOS(input);
  }

  listRecentEmergencies(): Promise<EmergencyAlert[]> {
    return this.repository.listRecentEmergencies();
  }

  subscribeToEmergencies(onAlert: (alert: EmergencyAlert) => void): () => void {
    return this.repository.subscribeToEmergencies(onAlert);
  }
}
