import { createBrowserClient } from '@supabase/ssr';
export function createClient() {
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
export const supabase = createClient();
export async function getCurrentUserId() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('Utilisateur non connecté');
    return user.id;
}
