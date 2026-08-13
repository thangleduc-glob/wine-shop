# quickstart.md — Validate user-auth feature

Purpose: Quick, runnable validation steps to confirm the signup and login UX in a local environment.

Prerequisites

- A local Supabase project or test project with Auth enabled.
- Environment variables set for SUPABASE_URL and SUPABASE_ANON_KEY (or project-equivalent). The Supabase Auth settings must be configured so signup does not require email verification for this test.
- Project dev scripts available (e.g., `npm run dev` or `yarn dev`).

Validation steps

1. Start the development server:
   - Run: `npm run dev` (or the project's dev command).
   - Expect: local dev server listening (commonly http://localhost:3000).

2. Open the landing page in a browser.

3. Signup flow test:
   - Click the "Sign up" control to open the auth page.
   - Enter a test email (e.g., test+1@example.com) and a password meeting the policy (min 8 chars, contains letter and number), then submit.
   - Expected result: The user is created and immediately signed in; the app redirects to the product list page which shows the empty state.

4. Login flow test:
   - From the landing page, open "Log in" and enter the same email/password used above.
   - Expected result: The user signs in and is redirected to the product list page.

5. Invalid credentials test:
   - Attempt login with an incorrect password.
   - Expected result: The auth page shows a clear, human-readable error and allows retry.

6. Notes on repeatability:
   - Use unique test emails (e.g., test+timestamp@example.com) to avoid collisions in the Supabase Auth project when re-running tests.

7. Troubleshooting hints:
   - If signup appears to require email verification, confirm Supabase Auth settings in the Supabase project dashboard and ensure the environment variables point to the intended test project.
