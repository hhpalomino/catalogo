# 🚀 Configuración Rápida del Sistema de Upload

## Paso 1: Obtener Credenciales de Supabase

### 1.1 Acceder a Supabase Dashboard
- URL: https://app.supabase.com
- Inicia sesión con tu cuenta
- Selecciona tu proyecto

### 1.2 Obtener URLs y Keys
- Ir a **Settings** → **API**
- Copiar:
  - **Project URL**: Bajo "Project URL" (formato: https://xxxxx.supabase.co)
  - **Anon Key**: Bajo "Project API keys" → "anon public"
  - **Service Role Secret**: Abajo en la misma página → "Service role secret"

## Paso 2: Agregar Variables al .env.local

Editar `.env.local` y agregar:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3N1cGFiYXNlLmlvIiwicmVmIjoiInZkOXZlc3FxdHp6eHhiZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc4NzA0ODAwLCJleHAiOjE5OTQ0NjQ0MDB9.X1234567890ABCDEFGHIJKLMNOP
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3N1cGFiYXNlLmlvIiwicmVmIjoiInZkOXZlc3FxdHp6eHhiZSIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2Nzg3MDQ4MDAsImV4cCI6MTk5NDQ2NDQwMH0.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH
```

## Paso 3: Crear Bucket en Supabase Storage

### 3.1 En el Dashboard
1. Ir a **Storage** (en el panel izquierdo)
2. Hacer clic en **Create bucket**

### 3.2 Configuración del Bucket
- **Bucket name**: `product-images`
- **Public bucket**: ✅ ACTIVADO (importante!)
- Clic en **Create bucket**

## Paso 4: Verificar la Instalación

### 4.1 Iniciar el servidor (si no está corriendo)
```bash
npm run dev
```

### 4.2 Probar el upload
1. Ir a http://localhost:3000/admin/login
2. Inicia sesión con admin
3. Ir a http://localhost:3000/admin/create
4. Completa el formulario y sube una imagen
5. Verifica que aparezca en el preview

### 4.3 Verificar en Supabase
1. Ir a **Storage** en Supabase dashboard
2. Abre la carpeta `product-images`
3. Deberías ver una carpeta con el ID del producto
4. Dentro, las imágenes con nombre de UUID

## Troubleshooting

### Error: "Property 'productImage' does not exist"
- Ejecutar: `npx prisma generate`
- Limpiar: `rm -r node_modules/.prisma && npm i`

### Las imágenes no se suben
- Verificar console (F12) por errores
- Revisar que el bucket sea PUBLIC
- Verificar credenciales en .env.local
- Reiniciar servidor: `npm run dev`

### URLs de imágenes no funcionan
- Verificar que NEXT_PUBLIC_SUPABASE_URL sea correcto
- Probar URL manualmente: `https://xxxxx.supabase.co/storage/v1/object/public/product-images/...`

## Estructura Resultante en Supabase Storage

```
product-images/
├── clsx1abc2def3ghi/ (productId)
│   ├── 550e8400-e29b-41d4-a716-446655440001.jpg
│   ├── 550e8400-e29b-41d4-a716-446655440002.png
│   └── 550e8400-e29b-41d4-a716-446655440003.webp
├── clsx2xyz4uvw5tsr/
│   ├── 660f9411-f30c-42e5-b827-557766551112.jpg
│   └── ...
└── ...
```

## URLs Públicas Generadas

Ejemplo de URL para acceder a una imagen:

```
https://xxxxx.supabase.co/storage/v1/object/public/product-images/clsx1abc2def3ghi/550e8400-e29b-41d4-a716-446655440001.jpg
```

## Seguridad

- **Bucket es público**: Cualquiera puede descargar imágenes (intencionalmente, ya que son productos a la venta)
- **Upload solo admin**: Solo usuarios autenticados como admin pueden subir
- **URLs son predecibles pero seguras**: Los IDs son UUIDs aleatorios

## Precios (Supabase Storage)

- **Almacenamiento**: 1 GB gratis, $0.10/GB después
- **Descarga**: 5 GB/mes gratis, $0.02/GB después
- **Para 1000 productos con 5 fotos promedio**: ~150 MB = GRATIS

## Siguiente

Una vez configurado, el sistema está 100% funcional. Los siguientes pasos opcionales son:

1. Agregar compresión de imágenes
2. Agregar recorte/rotación de imágenes
3. Agregar reordenamiento drag-and-drop
4. Agregar indicador de progreso de upload
