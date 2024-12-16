import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xygmqhxlnwjrgxvbzcyb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5Z21xaHhsbndqcmd4dmJ6Y3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NDIwNDEsImV4cCI6MjA0ODIxODA0MX0.Ymj8yhOu4tC8zgdx5tOmXnALSjvlPIAaD0lv_B-FgyE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});