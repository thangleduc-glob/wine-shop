# Tasks: user-auth

**Input**: specs/002-user-auth/spec.md, plan.md, research.md, data-model.md

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create .env.example entries for Supabase keys (.env.example)
- [ ] T002 [P] Add Supabase client wrapper in src/lib/supabaseClient.ts
- [ ] T003 [P] Add auth page placeholder in src/pages/auth.tsx
- [ ] T004 [P] Add products page placeholder in src/pages/products.tsx
- [ ] T005 [P] Add shared AuthForm component in src/components/AuthForm.tsx
- [ ] T006 [P] Add landing page link updates in src/pages/index.tsx (add "Log in" and "Sign up" controls)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T007 [P] Add Playwright E2E scaffold (playwright.config.ts and tests/e2e/)
- [ ] T008 Configure Supabase Auth project settings and document steps in docs/supabase-setup.md (disable email verification)

---

## Phase 3: User Story 1 - Signup (Priority: P1) 🎯 MVP

**Goal**: Allow a visitor to sign up with email & password and be immediately signed in and redirected to /products.

**Independent Test**: Using E2E, signup with a valid email/password and observe redirect to /products (empty state).

- [ ] T009 [US1] Implement signup UI wiring in src/pages/auth.tsx (use AuthForm)
- [ ] T010 [P] [US1] Implement client-side password validation in src/components/AuthForm.tsx (min 8 chars, letter+number)
- [ ] T011 [US1] Add signup handler using Supabase client in src/pages/auth.tsx (call supabase.auth.signUp)
- [ ] T012 [US1] Redirect to /products after successful signup in src/pages/auth.tsx
- [ ] T013 [US1] Add Playwright E2E test for signup in tests/e2e/signup.spec.ts

---

## Phase 4: User Story 2 - Login (Priority: P1)

**Goal**: Allow a registered user to log in with email & password and be redirected to /products.

**Independent Test**: Using E2E, login with an existing account and observe redirect to /products.

- [ ] T014 [US2] Implement login flow in src/pages/auth.tsx (reuse AuthForm, call supabase.auth.signInWithPassword)
- [ ] T015 [US2] Add Playwright E2E test for login in tests/e2e/login.spec.ts
- [ ] T016 [US2] Display inline, human-readable error messages for invalid credentials in src/pages/auth.tsx

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T017 [P] Update specs/002-user-auth/quickstart.md with any implementation notes and validation commands
- [ ] T018 [P] Add E2E test run script to package.json (e.g., "test:e2e": "playwright test")

---

## Dependencies & Execution Order

- Setup (Phase 1) tasks can start immediately; many are parallelizable (marked [P]).
- Foundational (Phase 2) blocks user story implementation and must complete before US1/US2 tasks that depend on Playwright or Supabase setup.
- User stories (US1, US2) can proceed after Foundational completion and are independent of each other.

## Parallel Opportunities

- Tasks marked [P] can run in parallel by different developers (T002, T003, T004, T005, T006, T007, T008, T010, T017, T018).

## Implementation Strategy

MVP: Complete Phase 1 + Phase 2, then deliver User Story 1 (Signup) as the minimum viable item, validate with Playwright. After MVP validation, implement User Story 2 (Login) and polish.


## Notes

- All tasks include exact file paths and acceptance test criteria where appropriate.
- Tests are included as E2E Playwright tasks per project constitution.
