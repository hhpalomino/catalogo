/**
 * Custom Hooks - Lógica reutilizable
 * Extrae la lógica de negocio de los componentes
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { productStatusApi, productApi } from "@/lib/api";
import type { ProductStatus, Product } from "@/lib/types";

// ============ USE PRODUCT STATUSES ============
/**
 * Hook para cargar estados de productos
 */
export function useProductStatuses() {
  const [statuses, setStatuses] = useState<ProductStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadStatuses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productStatusApi.getAll();
        if (mounted) {
          setStatuses(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Error al cargar estados");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStatuses();

    return () => {
      mounted = false;
    };
  }, []);

  const defaultStatus = statuses.find((s) => s.isDefault) || statuses[0];

  return { statuses, loading, error, defaultStatus };
}

// ============ USE PRODUCT ============
/**
 * Hook para cargar un producto por ID
 */
export function useProduct(productId: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      return;
    }

    let mounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getById(productId);
        if (mounted) {
          setProduct(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Error al cargar producto");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [productId]);

  return { product, loading, error, setProduct };
}

// ============ USE FORM STATE ============
/**
 * Hook genérico para manejo de estado de formularios
 */
export function useFormState<T>(initialState: T) {
  const initialStateRef = useRef(initialState);
  const [form, setForm] = useState<T>(initialState);
  const [dirty, setDirty] = useState(false);

  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  }, []);

  const resetForm = useCallback((newState?: T) => {
    setForm(newState || initialStateRef.current);
    setDirty(false);
  }, []);

  const setFormData = useCallback((data: T) => {
    setForm(data);
    setDirty(false);
  }, []);

  return {
    form,
    setForm,
    updateField,
    resetForm,
    setFormData,
    dirty,
  };
}

// ============ USE ASYNC ACTION ============
/**
 * Hook para manejar acciones asíncronas con loading y error
 */
export function useAsyncAction<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    action: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await action();
      if (onSuccess) {
        onSuccess(result);
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Error desconocido");
      setError(error.message);
      if (onError) {
        onError(error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { loading, error, execute, clearError };
}

// ============ USE DEBOUNCE ============
/**
 * Hook para debounce de valores
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
