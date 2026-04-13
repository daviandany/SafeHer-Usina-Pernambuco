import { AuthService } from "../../features/auth/application/AuthService";
import { SupabaseAuthRepository } from "../../features/auth/data/SupabaseAuthRepository";
import { EmergencyService } from "../../features/emergency/application/EmergencyService";
import { SupabaseEmergencyRepository } from "../../features/emergency/data/SupabaseEmergencyRepository";

export const authService = new AuthService(new SupabaseAuthRepository());
export const emergencyService = new EmergencyService(new SupabaseEmergencyRepository());
