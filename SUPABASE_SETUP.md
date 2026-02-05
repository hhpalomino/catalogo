# Configuración de Supabase Storage

## Pasos necesarios para habilitar el upload de imágenes

### 1. Obtener credenciales de Supabase

1. Inicia sesión en [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API** 
4. Copia estos valores:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Secret**: `SUPABASE_SERVICE_ROLE_KEY` (en la misma página, debajo)

### 2. Configurar variables de entorno

Abre `.env.local` y agrega:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Crear bucket en Supabase Storage

1. Ve a **Storage** en el dashboard de Supabase
2. Haz clic en **Create a new bucket**
3. **Nombre**: `product-images`
4. **Public bucket**: ✅ ACTIVADO (importante para que las URLs sean públicas)
5. Clic en **Create bucket**

### 4. Configurar políticas de acceso (opcional)

Las políticas RLS son opcionales porque el bucket es público. Si quieres restringir:
- Puedes permitir solo usuarios autenticados
- Puedes permitir solo admin para eliminar

### 5. Estructura de almacenamiento

El sistema automáticamente organizará los archivos así:

```
product-images/
├── {productId}/
│   ├── {imageId}.jpg
│   ├── {imageId}.png
│   └── {imageId}.webp
└── ...
```

## URLs públicas

Una vez subida una imagen, se accede con:

```
https://{projectUrl}/storage/v1/object/public/product-images/{productId}/{imageId}.{ext}
```

## Límites

- **Almacenamiento**: 1 GB (gratis), luego $0.10/GB
- **Descarga**: 5 GB/mes (gratis), luego $0.02/GB

## Validaciones en el cliente

- Formatos permitidos: JPG, PNG, WebP
- Tamaño máximo: 5 MB por imagen
- Múltiples imágenes por upload

## Eliminación de imágenes

Al eliminar una imagen desde el admin:
1. Se elimina de Supabase Storage
2. Se elimina el registro de la base de datos
3. Puedes destacar otra como principal
