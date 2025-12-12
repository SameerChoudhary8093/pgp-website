"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const DEV_MODE = process.env.NEXT_PUBLIC_AUTH_DEV_MODE === "true";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAuthHeader(): Promise<Record<string, string>> {
  if (DEV_MODE && typeof window !== "undefined") {
    const devUserId = window.localStorage.getItem("devUserId");
    if (devUserId) {
      return { Authorization: `Dev ${devUserId}` };
    }
  }
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
