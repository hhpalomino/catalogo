# Sistema de Upload de Imágenes - Implementación Completada

## Cambios Realizados

### 1. **API Endpoint de Upload** (`app/api/upload/route.ts`)
- ✅ Endpoint POST para subir imágenes a Supabase Storage
- ✅ Validación de tipo (JPG, PNG, WebP) 
- ✅ Validación de tamaño (máx 5MB)
- ✅ Almacenamiento en carpeta por productId
- ✅ Endpoint DELETE para eliminar imágenes y su registro en BD

**Flujo:**
1. Cliente envía FormData con `file` y `productId`
2. API valida el archivo
3. Genera UUID para imageId
4. Sube a Supabase Storage: `product-images/{productId}/{imageId}.{ext}`
5. Crea registro ProductImage en BD
6. Retorna URL pública

### 2. **Componente ImageUploadInput** (`components/ImageUploadInput.tsx`)
- ✅ Interfaz drag-and-drop para subir múltiples imágenes
- ✅ Preview de imágenes con miniaturas
- ✅ Opción de destacar imagen como principal
- ✅ Botón para eliminar imágenes
- ✅ Validación en cliente (tipo y tamaño)
- ✅ Manejo de errores y estado de carga
- ✅ Notificación de cambios al componente padre

### 3. **Actualización AdminProductForm** (`components/admin/AdminProductForm.tsx`)
- ✅ Integración del nuevo ImageUploadInput
- ✅ Inicialización de imágenes para edición
- ✅ Validación: requiere al menos 1 imagen
- ✅ Botón de submit deshabilitado si no hay imágenes
- ✅ Conversión correcta de imágenes al formato de API

### 4. **Actualización de APIs de Productos**
- **POST /api/products**: Procesa string separado por comas o array de URLs
- **PUT /api/products/[id]**: Maneja agregar/eliminar imágenes
  - Detecta imágenes nuevas y existentes
  - Elimina imágenes que ya no están en la lista
  - Agrega nuevas imágenes automáticamente

### 5. **Configuración de Supabase** (`lib/supabase.ts`)
- ✅ Cliente público para operaciones de frontend
- ✅ Cliente admin con service role para backend
- ✅ Constantes y helpers para rutas de storage
- ✅ Función para generar URLs públicas

### 6. **Páginas de Admin**
- ✅ `app/admin/edit/[id]/page.tsx`: Carga imágenes iniciales para edición
- ✅ `app/admin/page.tsx`: Fixed tipo de productos para queries con `as any`
- ✅ Tipos correctos para ProductImage objects

### 7. **Componentes de Visualización**
- ✅ `ProductGallery.tsx`: Ahora trabaja con objetos ProductImage
- ✅ `ProductCard.tsx`: Extrae imageUrl de objetos correctamente

## Variables de Entorno Necesarias

Agregar a `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Configuración de Supabase Storage (ONE-TIME)

1. Ir a dashboard de Supabase
2. Ir a **Storage** → **Create bucket**
3. Nombre: `product-images`
4. Activar **Public bucket**: ✅
5. Crear bucket

## Cómo Usar

### Crear Producto
1. Admin accede a `/admin/create`
2. Completa formulario
3. Arrastra fotos o haz clic en zona de upload
4. Elige imagen principal (la primera seleccionada por defecto)
5. Haz clic en "Crear Producto"

### Editar Producto
1. Admin accede a `/admin` → click en producto
2. Las imágenes actuales aparecen en el componente
3. Puede agregar nuevas imágenes
4. Puede eliminar imágenes existentes
5. Haz clic en "Actualizar Producto"

## Características Implementadas

✅ **Upload**
- Múltiples imágenes por formulario
- Validación de tipo y tamaño
- Progreso visual

✅ **Almacenamiento**
- Supabase Storage (público)
- Estructura organizada por productId
- URLs públicas automáticas

✅ **Administración**
- Destacar imagen principal
- Eliminar imágenes
- Reordenar (código preparado para futuro)

✅ **Base de Datos**
- ProductImage relacionada con Product
- Campos: id, productId, imageUrl, isMain, displayOrder
- Eliminación en cascada

✅ **Frontend**
- Interfaz moderna con drag-and-drop
- Previews de imágenes
- Mensajes de error claros
- Estados de carga

## Archivos Modificados

```
app/
  api/
    upload/route.ts (NUEVO)
    products/route.ts (ACTUALIZADO)
    products/[id]/route.ts (ACTUALIZADO)
  admin/
    page.tsx (ACTUALIZADO)
    edit/[id]/page.tsx (ACTUALIZADO)
  page.tsx (ACTUALIZADO)
  product/[id]/page.tsx (ACTUALIZADO)

components/
  ImageUploadInput.tsx (ACTUALIZADO)
  ProductGallery.tsx (ACTUALIZADO)
  admin/AdminProductForm.tsx (ACTUALIZADO)

lib/
  supabase.ts (CREADO)

SUPABASE_SETUP.md (ACTUALIZADO)
```

## Próximos Pasos Opcionales

- [ ] Compresión de imágenes en cliente
- [ ] Preview antes de subir
- [ ] Reordenar imágenes con drag-and-drop
- [ ] Recortar/rotar imágenes
- [ ] Indicador de progreso de upload
- [ ] Borrado de imágenes del storage cuando se elimina producto
