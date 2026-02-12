/**
 * Tipos compartidos de la aplicación
 * Centralizados para evitar duplicación
 */

// ============ PRODUCT ============
export interface Product {
  id: string;
  title: string;
  description: string;
  statusId: string;
  entregado: boolean;
  pagado: boolean;
  condition: ProductCondition;
  measurements: string;
  price: number;
  images: ProductImage[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductWithStatus extends Product {
  status: ProductStatus;
}

export interface ProductWithImages extends Omit<Product, 'images'> {
  images: ProductImage[];
}

export interface ProductWithRelations extends Omit<Product, 'images'> {
  status: ProductStatus;
  images: ProductImage[];
}

// Para formularios de creación (sin id)
export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

// Para actualización (id requerido)
export type ProductUpdate = Partial<ProductInput> & { id: string };

// ============ PRODUCT STATUS ============
export interface ProductStatus {
  id: string;
  name: string;
  displayName: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
}

// ============ PRODUCT IMAGE ============
export interface ProductImage {
  id: string;
  imageUrl: string;
  isMain: boolean;
  displayOrder: number;
  productId: string;
  createdAt?: Date;
}

// Para manejo de imágenes en UI
export interface UploadedImage {
  id: string;
  url: string;
  isMain?: boolean;
  displayOrder?: number;
}

// ============ USER/ADMIN ============
export interface User {
  id: string;
  username: string;
  passwordHash: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

// ============ API RESPONSES ============
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  statusCode?: number;
}

// ============ ENUMS ============
export type ProductCondition = "Excellent" | "Very good" | "Good" | "Regular";

// ============ FORM PROPS ============
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export type CreateProductModalProps = BaseModalProps;

export interface EditProductModalProps extends BaseModalProps {
  productId: string | null;
}

export interface DeleteProductModalProps extends BaseModalProps {
  productId: string | null;
  productTitle?: string;
}
