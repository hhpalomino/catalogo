/**
 * Constantes de la aplicación
 * Centralizadas para evitar valores hardcodeados duplicados
 */

import { ProductCondition } from "./types";

// ============ PRODUCT CONDITIONS ============
export const PRODUCT_CONDITIONS = [
  "Nuevo",
  "Usado - Excelente",
  "Usado - Bueno",
  "Usado - Aceptable",
  "Usado - Con detalles",
] as const;

export const PRODUCT_CONDITIONS_ES: Record<ProductCondition, string> = {
  "Excellent": "Excelente",
  "Very good": "Muy bueno",
  "Good": "Bueno",
  "Regular": "Regular",
};

// ============ IMAGE SETTINGS ============
export const IMAGE_CONFIG = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp"],
} as const;

// ============ VALIDATION ============
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 4,
  MIN_PRODUCT_TITLE_LENGTH: 3,
  MAX_PRODUCT_TITLE_LENGTH: 200,
  MIN_PRODUCT_DESCRIPTION_LENGTH: 10,
  MAX_PRODUCT_DESCRIPTION_LENGTH: 2000,
  MIN_PRICE: 0,
  MAX_PRICE: 999999999,
} as const;

// ============ UI ============
export const UI = {
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
} as const;

// ============ API ENDPOINTS ============
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  PRODUCT_STATUSES: "/api/product-statuses",
  ADMIN_LOGIN: "/api/admin/login",
  ADMIN_LOGOUT: "/api/admin/logout",
  ADMIN_CHANGE_PASSWORD: "/api/admin/change-password",
  UPLOAD: "/api/upload",
} as const;

// ============ ROUTES ============
export const ROUTES = {
  HOME: "/",
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_CREATE: "/admin/create",
  ADMIN_EDIT: (id: string) => `/admin/edit/${id}`,
  ADMIN_DELETE: (id: string) => `/admin/delete/${id}`,
  PRODUCT: (id: string) => `/product/${id}`,
} as const;

// ============ STORAGE ============
export const STORAGE = {
  BUCKET_NAME: "product-images",
  TEMP_FOLDER: "temp",
} as const;
