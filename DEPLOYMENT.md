# Deployment

## Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Set the build command to `pnpm build` or `pnpm exec vite build`.
4. Set the output directory to `dist`.
5. Add environment variables from `.env.example`.
6. Deploy.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Enable Google login in Auth.
4. Add the Vercel production URL and local development URL to the allowed redirect URLs.
5. Copy the Supabase URL and anon key into Vercel environment variables.

## Notes

- This app currently keeps progress locally.
- The SQL schema is ready for online auth and per-user storage.
- Next step is wiring the client to Supabase Auth and replacing local persistence with database sync.
