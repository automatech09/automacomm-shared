import { createBrowserClient } from '@supabase/ssr';
export declare function createSupabaseBrowserClient(url: string, key: string): import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
export declare function getCurrentUserId(supabase: ReturnType<typeof createBrowserClient>): Promise<string>;
