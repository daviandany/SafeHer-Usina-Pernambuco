import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

/**
 * Configura a strategy do Google OAuth 2.0 no Passport.
 *
 * Observação: o callbackURL precisa ser igual ao configurado no
 * Google Cloud Console (OAuth consent screen / Credentials).
 */
export function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          // Em produção, persista/busque o usuário no banco aqui.
          // Exemplo: encontrar usuário pelo profile.id ou e-mail.
          const user = {
            id: profile.id,
            displayName: profile.displayName,
            emails: profile.emails,
            photos: profile.photos,
            provider: profile.provider,
          };

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  /**
   * Serialize: define quais dados mínimos vão para a sessão.
   * Idealmente guarde apenas um identificador (ex.: user.id).
   */
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  /**
   * Deserialize: reconstrói o objeto do usuário a partir da sessão.
   * Em produção, recupere dados atualizados do banco usando o ID.
   */
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
