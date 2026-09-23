# Wassel Dridi, portfolio

Next.js static export. Black and white, arcs and circles, scroll and sticky motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## The admin dashboard (/admin)

Open `yoursite.com/admin/`. It is not linked anywhere on the site and is marked
`noindex`. **A hidden URL is not security on its own**, so it is protected two ways:
a real login, and database rules that only accept writes from your account.

Without Supabase it runs in **local preview**: fully working, but changes stay in
your browser only. To publish changes to visitors (about 5 minutes, free tier):

1. Create a project at supabase.com.
2. **Authentication -> Users -> Add user.** Use your email and a strong password
   (tick "Auto confirm"). Then **Authentication -> Sign In / Providers -> Email**
   and turn **off** "Allow new users to sign up".
3. **SQL Editor:** paste `supabase/setup.sql` and Run. If you log in with a
   different email than `wasselforbusiness@gmail.com`, change it on the marked line first.
4. Copy `.env.example` to `.env.local` and fill in the URL and anon key
   (Project Settings -> API). Add the same variables to your host and redeploy.
5. Open `/admin/`, sign in, and click **Import current projects / certificates**
   once so the built-in content becomes editable.

Add, edit, delete and reorder from there. Uploaded screenshots are resized in the
browser and stored in Supabase Storage. If a table is ever empty, the site falls
back to the built-in content in `lib/data/`.

To move the dashboard to a less guessable URL, rename the `app/admin` folder.

## Before you deploy

- `app/layout.js`: `metadataBase` is still the original `https://example.com`. Set your real domain.
- Certificate dates: the old Education list said the CPPS was issued Dec 29, 2025;
  the certificate entry said Dec 3, 2025. I kept Dec 3. Fix it in `/admin` if wrong.

