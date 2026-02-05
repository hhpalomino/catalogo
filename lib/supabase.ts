import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Cliente para operaciones públicas (frontend)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Cliente para operaciones backend (con permisos elevados)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Bucket name
export const STORAGE_BUCKET = "product-images";

// Generar ruta de storage
export const getStoragePath = (productId: string, imageId: string, ext: string) => {
  return `${productId}/${imageId}.${ext}`;
};

// Generar URL pública
export const getPublicUrl = (path: string) => {
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
};
