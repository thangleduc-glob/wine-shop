# wine-shop — Project Overview

Summary
- wine-shop is an e-commerce web app selling alcoholic beverages to end users.
- Payments are handled offline (no online payment gateway integration required).
- Built with React + TypeScript on the frontend, Supabase (Postgres + Auth) for backend services and data.

Primary user flows
- Landing page: marketing content, product browsing, search and categories.
- Authentication: users can sign up and sign in via Supabase Auth.
- Shopping cart: users add products, update quantities, and review cart contents.
- Checkout: users submit orders; payment is completed offline (instructions shown at checkout).

Admin features
- Admin dashboard (authenticated admin role) to view all users and orders.
- Manage product catalog: create, edit, archive products and update inventory.
- Order management: view orders, update order status (pending, processing, shipped, cancelled), and add admin notes.

Actors & roles
- Guest: browse products and landing pages.
- Customer: authenticated user who can add to cart and place orders.
- Admin: privileged user who can manage products and orders and view user data.

Data & documentation
- Database schema and RLS policies are documented in /supabase/supabase.md (documentation-first). Migrations must implement the documented state.
- Project overview (this file) describes the product-level intent and primary workflows — keep it current when adding features.

Non-functional constraints
- Accessibility: follow WCAG 2.1 AA for user-facing pages where practical.
- Responsiveness: UI must work on mobile and desktop breakpoints.
- Security: no secrets in repo, use environment variables; enable RLS for sensitive tables.

Operational notes
- No online payment integration: orders are recorded and marked for offline payment processing.
- Admin actions that change schema or RLS MUST include updates to /supabase/supabase.md and migrations in the same PR.

Tech stack
- Frontend: React, TypeScript
- Backend: Supabase (Postgres, Auth, Storage as needed)

Maintenance
- Keep README and project.md in sync. Use project.md to explain high-level features for reviewers and new contributors.
