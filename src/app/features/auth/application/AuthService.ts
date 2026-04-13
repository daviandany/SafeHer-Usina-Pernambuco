import type { AuthRepository, SignInInput, SignUpInput, UserSession } from "../domain/AuthRepository";

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  signUp(input: SignUpInput): Promise<void> {
    return this.repository.signUp(input);
  }

  signIn(input: SignInInput): Promise<UserSession> {
    return this.repository.signIn(input);
  }

  signOut(): Promise<void> {
    return this.repository.signOut();
  }

  getCurrentUser(): Promise<UserSession | null> {
    return this.repository.getCurrentUser();
  }
}
