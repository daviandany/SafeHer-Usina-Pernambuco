/**
 * Middleware para garantir que apenas usuários autenticados acessem a rota.
 */
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}
