import type { AuthRepository, SignInInput, SignUpInput, UserSession } from "../domain/AuthRepository";
import { supabaseClient } from "../../../core/config/supabaseClient";

export class SupabaseAuthRepository implements AuthRepository {
  async signUp(input: SignUpInput): Promise<void> {
    const { error } = await supabaseClient.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.fullName,
          cpf: input.cpf,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async signIn(input: SignInInput): Promise<UserSession> {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error || !data.user) {
      throw new Error(error?.message ?? "Falha ao autenticar usuária.");
    }

    return {
      id: data.user.id,
      email: data.user.email ?? input.email,
    };
  }

  async signOut(): Promise<void> {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<UserSession | null> {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email ?? "",
    };
  }
}
