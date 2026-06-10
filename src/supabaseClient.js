import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyiujvjuzcqqtscgeyoi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5aXVqdmp1emNxcXRzY2dleW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNTY0NzMsImV4cCI6MjA5NjYzMjQ3M30.AGiVfO3nPCyN-II-y9zdByBOk6QAy-hV_MCm_tf5TOs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
