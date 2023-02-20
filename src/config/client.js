import { createClient } from "@supabase/supabase-js"; 

const url = 'https://yhzpuqnwpjoqzidfmvfy.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloenB1cW53cGpvcXppZGZtdmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYzNzE5NjQsImV4cCI6MTk5MTk0Nzk2NH0.OsJQBIrXBPHAAELxK6GGR_UENlVvTS79VrWHzWmnG34'

export const supabase = createClient(
    url,
    anon_key
);