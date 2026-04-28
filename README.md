# SafeHer

## Running the frontend

- Run `npm i` to install dependencies.
- Run `npm run dev` to start Vite.

## Running the Express server (Google OAuth + Passport)

1. Copy env template:
   - `cp .env.example .env`
2. Fill in Google OAuth credentials in `.env`:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_CALLBACK_URL` (must match Google Console)
   - `SESSION_SECRET`
3. Start backend server:
   - `npm run start`

### Main routes

- `GET /auth/google` → starts Google login flow.
- `GET /auth/google/callback` → Google OAuth callback.
- `GET /dashboard` → protected route, requires logged-in session.
- `POST /auth/logout` → ends session.

### Security notes

- Never commit real credentials.
- Use a strong `SESSION_SECRET` in production.
- Keep `cookie.secure = true` in production environments using HTTPS.
