#!/usr/bin/env bash
# Helper: run supabase db advisors locally for the current project
# Usage: cd repo-root && ./supabase/scripts/run_advisors.sh

if ! command -v supabase >/dev/null 2>&1; then
  echo supabaseCLInotfound.Installitfromhttps://supabase.com/docs/guides/cli >&2
  exit 2
fi

# Run advisors (may require supabase login and project selection)
supabase db advisors || { echo supabasedbadvisorsfailed; exit 1; }
