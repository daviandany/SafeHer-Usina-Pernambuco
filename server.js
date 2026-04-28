import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { configurePassport } from './server/config/passport.js';
import authRouter from './server/routes/auth.routes.js';
import dashboardRouter from './server/routes/dashboard.routes.js';

const app = express();

// Segurança: em produção, use um valor forte em SESSION_SECRET via variável de ambiente.
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-in-production';
const PORT = Number(process.env.PORT) || 3000;

// Se estiver atrás de proxy (ex.: Render, Heroku, Nginx), ajuda com cookies secure.
app.set('trust proxy', 1);

// Body parser para rotas POST (ex.: logout)
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: 'sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 24h
    },
  })
);

// Inicializa Passport + suporte à sessão do Passport.
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Rotas de apoio
app.get('/', (_req, res) => {
  res.send(`
    <h1>Login com Google (Passport.js)</h1>
    <a href="/auth/google">Entrar com Google</a>
  `);
});

app.get('/login', (_req, res) => {
  res.status(401).send(`
    <h1>Login</h1>
    <p>Você precisa autenticar para acessar o dashboard.</p>
    <a href="/auth/google">Entrar com Google</a>
  `);
});

app.use('/auth', authRouter);
app.use(dashboardRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send('Erro interno no servidor.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
