import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

/**
 * Inicia o fluxo de login com Google.
 * Scope "profile" e "email" para dados básicos de usuário.
 */
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

/**
 * Callback do Google.
 * - Sucesso: redireciona para /dashboard
 * - Falha: redireciona para /login
 */
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (_req, res) => {
    res.redirect('/dashboard');
  }
);

/**
 * Logout da sessão atual.
 */
authRouter.post('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie('sid');
      return res.redirect('/login');
    });
  });
});

export default authRouter;
