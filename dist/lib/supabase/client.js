import { createBrowserClient } from '@supabase/ssr';
export function createSupabaseBrowserClient(url, key) {
    return createBrowserClient(url, key);
}
// Helper optionnel si tu veux garder une fonction utilitaire
export async function getCurrentUserId(supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('Utilisateur non connecté');
    return user.id;
}
