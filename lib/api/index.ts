/**
 * Servicios API - Abstracción de llamadas HTTP
 * Centraliza la lógica de comunicación con el backend
 */

import { API_ENDPOINTS } from "../constants";
import type { Product, ProductInput, ProductStatus } from "../types";

// ============ HELPER FUNCTIONS ============
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

// ============ PRODUCT API ============
export const productApi = {
  /**
   * Obtener todos los productos
   */
  async getAll(): Promise<Product[]> {
    const response = await fetch(API_ENDPOINTS.PRODUCTS, {
      cache: "no-store",
    });
    return handleResponse<Product[]>(response);
  },

  /**
   * Obtener un producto por ID
   */
  async getById(id: string): Promise<Product> {
    const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
      cache: "no-store",
    });
    return handleResponse<Product>(response);
  },

  /**
   * Crear un nuevo producto
   */
  async create(data: ProductInput): Promise<Product> {
    const response = await fetch(API_ENDPOINTS.PRODUCTS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(response);
  },

  /**
   * Actualizar un producto existente
   */
  async update(id: string, data: Partial<ProductInput>): Promise<Product> {
    const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Product>(response);
  },

  /**
   * Eliminar un producto
   */
  async delete(id: string): Promise<{ message: string }> {
    const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
      method: "DELETE",
    });
    return handleResponse<{ message: string }>(response);
  },
};

// ============ PRODUCT STATUS API ============
export const productStatusApi = {
  /**
   * Obtener todos los estados de productos
   */
  async getAll(): Promise<ProductStatus[]> {
    const response = await fetch(API_ENDPOINTS.PRODUCT_STATUSES, {
      cache: "no-store",
    });
    return handleResponse<ProductStatus[]>(response);
  },
};

// ============ AUTH API ============
export const authApi = {
  /**
   * Iniciar sesión
   */
  async login(username: string, password: string): Promise<{ message: string }> {
    const response = await fetch(API_ENDPOINTS.ADMIN_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse<{ message: string }>(response);
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<{ message: string }> {
    const response = await fetch(API_ENDPOINTS.ADMIN_LOGOUT, {
      method: "POST",
    });
    return handleResponse<{ message: string }>(response);
  },

  /**
   * Cambiar contraseña
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    const response = await fetch(API_ENDPOINTS.ADMIN_CHANGE_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse<{ message: string }>(response);
  },
};

// ============ IMAGE API ============
export const imageApi = {
  /**
   * Subir una imagen
   */
  async upload(file: File, productId: string): Promise<{ image: any }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", productId);

    const response = await fetch(API_ENDPOINTS.UPLOAD, {
      method: "POST",
      body: formData,
    });
    return handleResponse<{ image: any }>(response);
  },
};
