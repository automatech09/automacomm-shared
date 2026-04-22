import { createBrowserClient } from '@supabase/ssr';

export function createSupabaseBrowserClient(url: string, key: string) {
  return createBrowserClient(url, key);
}

// Helper optionnel si tu veux garder une fonction utilitaire
export async function getCurrentUserId(supabase: ReturnType<typeof createBrowserClient>): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Utilisateur non connecté');
  return user.id;
}
