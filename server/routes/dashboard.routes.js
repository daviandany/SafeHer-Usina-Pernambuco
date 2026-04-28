import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated.js';

const dashboardRouter = Router();

/**
 * Exemplo de rota protegida.
 * Só entra se houver usuário autenticado na sessão.
 */
dashboardRouter.get('/dashboard', ensureAuthenticated, (req, res) => {
  const { displayName, emails } = req.user || {};
  const email = emails?.[0]?.value || 'não informado';

  res.send(`
    <h1>Dashboard</h1>
    <p>Bem-vinda(o), ${displayName || 'usuária(o)'}!</p>
    <p>E-mail: ${email}</p>
    <form method="POST" action="/auth/logout">
      <button type="submit">Sair</button>
    </form>
  `);
});

export default dashboardRouter;
