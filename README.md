# 🛍️ Catálogo de Productos

Aplicación web de catálogo público de productos construida con Next.js 15 (App Router). Permite a los usuarios navegar productos sin autenticación, visualizar detalles completos y explorar galerías de imágenes interactivas.

## ✨ Características

- 🎨 **UI moderna y responsiva** - Diseño adaptable a todos los dispositivos
- 🖼️ **Galería interactiva** - Visualización de múltiples imágenes con thumbnails clickeables
- 🏷️ **Sistema de estados** - Badge visual para cada estado del producto (Disponible, Reservado, Pagado, Entregado, Vendido)
- ⚡ **Optimización de imágenes** - Uso de Next.js Image para carga optimizada
- 🎯 **SEO optimizado** - Metadata dinámica para cada página
- 📱 **Mobile-first** - Diseño responsive desde mobile hasta desktop
- 🌐 **Generación estática** - Pre-renderizado de páginas para máximo rendimiento
- ♿ **Accesibilidad** - Diseño accesible con semántica HTML correcta

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar linter
```

## 📁 Estructura del Proyecto

```
catalogo/
├── app/                      # App Router de Next.js
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página home (catálogo)
│   ├── globals.css          # Estilos globales
│   └── product/
│       └── [id]/
│           └── page.tsx     # Página de detalle del producto
├── components/              # Componentes React
│   ├── ProductCard.tsx     # Card de producto para el grid
│   ├── ProductGallery.tsx  # Galería interactiva de imágenes
│   └── StateBadge.tsx      # Badge de estado reutilizable
├── data/
│   └── products.ts         # Datos estáticos de productos
├── lib/
│   └── product-ui.ts       # Helpers de UI (formateo, badges)
└── public/
    └── images/             # Imágenes de productos
```

## 🗂️ Modelo de Datos

### Product Type

```typescript
type Product = {
  id: number;              // ID único
  title: string;           // Título del producto
  description: string;     // Descripción (multiline con \n)
  state: string;          // Estado: "available" | "reserved" | "paid" | "delivered" | "sold"
  condition: string;      // Condición: "Excellent" | "Good" | "Very good"
  measurements: string;   // Medidas/talla (multiline con \n)
  price: number;          // Precio en CLP (entero)
  images: string[];       // Rutas de imágenes (ej: "/images/zapas1.jpg")
};
```

### Agregar Productos

Edita `data/products.ts`:

```typescript
const products: Product[] = [
  {
    id: 4,
    title: "Nuevo Producto",
    description: "Descripción del producto.\nPuede tener múltiples líneas.",
    state: "available",
    condition: "Excellent",
    measurements: "Talla L",
    price: 50000,
    images: [
      "/images/producto1.jpg",
      "/images/producto2.jpg"
    ]
  },
  // ... más productos
];
```

Coloca las imágenes en `public/images/`.

## 🎨 Componentes Principales

### ProductCard
Card de producto para el grid del catálogo. Incluye imagen, título, condición, precio y badge de estado.

**Props:**
- `product: Product` - Objeto producto a mostrar

### ProductGallery
Galería interactiva con imagen principal y thumbnails.

**Props:**
- `images: string[]` - Array de rutas de imágenes
- `title: string` - Título del producto (para alt text)

### StateBadge
Badge visual para mostrar el estado del producto.

**Props:**
- `state: string` - Estado del producto
- `size?: "sm" | "md"` - Tamaño del badge (default: "sm")

## 🎯 Roadmap Futuro

- [ ] Filtros por estado en el home
- [ ] Ordenamiento de productos
- [ ] Búsqueda de productos
- [ ] Backend con API/base de datos
- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] Carrito de compras
- [ ] Integración de pagos
- [ ] Dark mode completo
- [ ] Internacionalización (i18n)

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** CSS-in-JS (inline) + CSS Variables
- **Optimización:** Next.js Image
- **Deployment:** Vercel (recomendado)

## 📝 Notas de Desarrollo

- El proyecto usa Next.js 15 con App Router, por lo que `params` es asíncrono
- Las imágenes se optimizan automáticamente con `next/image`
- Los productos actualmente son estáticos (`data/products.ts`)
- El campo `state` es un string libre (no enum por ahora)
- Se usa `generateStaticParams` para pre-renderizar páginas de productos

## 🚢 Despliegue

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Conecta tu repo en [vercel.com](https://vercel.com)
3. Vercel detectará Next.js automáticamente
4. Deploy! 🎉

### Otros Hosting

```bash
# Build de producción
npm run build

# Iniciar servidor
npm run start
```

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

---

Desarrollado con ❤️ usando Next.js
