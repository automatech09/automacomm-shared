

import type { SupabaseClient } from '@supabase/supabase-js';

interface StorageOptions {
  supabase: SupabaseClient;
  bucket: string;
  folder?: string;
  ownerId?: string;
}

function buildPath({ folder = '', ownerId = '' }: { folder?: string; ownerId?: string }) {
  return [ownerId, folder].filter(Boolean).join('/');
}

export async function uploadImage({supabase, file, bucket, folder = 'images', ownerId,}: StorageOptions & { file: File }): Promise<string> {
  const ext = file.name.split('.').pop() || 'png';
  const basePath = buildPath({ folder, ownerId });
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `${basePath}/${filename}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error(`Upload échoué : ${error.message}`);

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function deleteImage({
  supabase,
  bucket,
  folder = 'images',
  ownerId,
  filename,
}: StorageOptions & { filename: string }): Promise<void> {
  const basePath = buildPath({ folder, ownerId });
  const { error } = await supabase.storage.from(bucket).remove([`${basePath}/${filename}`]);

  if (error) throw new Error(`Suppression échouée : ${error.message}`);
}

export async function listImages({
  supabase,
  bucket,
  folder = 'images',
  ownerId,
}: StorageOptions): Promise<{ name: string; url: string }[]> {
  const basePath = buildPath({ folder, ownerId });

  const { data, error } = await supabase.storage.from(bucket).list(basePath, {
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error) throw new Error(`Lecture échouée : ${error.message}`);

  return (data ?? []).map((file) => ({
    name: file.name,
    url: supabase.storage.from(bucket).getPublicUrl(`${basePath}/${file.name}`).data.publicUrl,
  }));
}