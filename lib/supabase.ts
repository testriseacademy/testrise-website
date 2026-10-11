import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xxduckyebkultgnrwrjf.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZHVja3llYmt1bHRnbnJ3cmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3Mzc1NzAsImV4cCI6MjEwNzMxMzU3MH0.TutXlTJyGrt_omOIJpyPiRDrs335FClzC2x8Bq3iS8M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
