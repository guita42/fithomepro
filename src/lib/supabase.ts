import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          current_weight: number;
          height: number;
          goal_weight: number;
          age: number;
          gender: string;
          activity_level: string;
          subscription_status: 'free' | 'active' | 'cancelled';
          subscription_plan: 'monthly' | 'annual' | null;
          subscription_end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          current_weight: number;
          height: number;
          goal_weight: number;
          age: number;
          gender: string;
          activity_level: string;
          subscription_status?: 'free' | 'active' | 'cancelled';
          subscription_plan?: 'monthly' | 'annual' | null;
          subscription_end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          current_weight?: number;
          height?: number;
          goal_weight?: number;
          age?: number;
          gender?: string;
          activity_level?: string;
          subscription_status?: 'free' | 'active' | 'cancelled';
          subscription_plan?: 'monthly' | 'annual' | null;
          subscription_end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
