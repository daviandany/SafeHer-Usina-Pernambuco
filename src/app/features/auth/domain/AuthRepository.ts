export type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  cpf: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export interface UserSession {
  id: string;
  email: string;
}

export interface AuthRepository {
  signUp(input: SignUpInput): Promise<void>;
  signIn(input: SignInInput): Promise<UserSession>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<UserSession | null>;
}
