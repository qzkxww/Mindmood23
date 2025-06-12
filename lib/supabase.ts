import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          onboarding_complete: boolean;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          onboarding_complete?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          onboarding_complete?: boolean;
        };
      };
    };
  };
};