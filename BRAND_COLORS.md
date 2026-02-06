# 🎨 Garage Market - Paleta de Colores de Marca

Documento de referencia para la implementación consistente de los colores de Garage Market en toda la aplicación.

## Color Primario - OLIVE
- **Hex**: `#4F6F52`
- **RGB**: rgb(79, 111, 82)
- **Uso**: Botones primarios, enlaces, acentos principales, hover en elementos
- **Clase Tailwind**: `bg-[#4F6F52]`, `text-[#4F6F52]`, `border-[#4F6F52]`

### Variaciones Olive
- **Hover**: `#3F5C43`
- **Pressed**: `#334B37`
- **Light (50)**: `#F0F3F1`
- **100**: `#E2E7E3`
- **200**: `#CAD3CB`

## Color Acento - TERRACOTTA
- **Hex**: `#C26D4A`
- **RGB**: rgb(194, 109, 74)
- **Uso**: Precios destacados, badges, focus rings, acentos secundarios
- **Clase Tailwind**: `bg-[#C26D4A]`, `text-[#C26D4A]`

### Variaciones Terracotta
- **Light (50)**: `#FAF3F0`
- **100**: `#F5E7E2`
- **300**: `#E3BDAD`
- **Dark (700)**: `#985B42`

## Color de Texto - CHARCOAL
- **Hex**: `#2E2E2E`
- **RGB**: rgb(46, 46, 46)
- **Uso**: Texto principal, headings, iconos oscuros
- **Clase Tailwind**: `text-[#2E2E2E]`, `dark:text-[#2E2E2E]`

## Color de Fondo Claro - SAND
- **Hex**: `#F5F3EF`
- **RGB**: rgb(245, 243, 239)
- **Uso**: Fondos claros, alternancia en listas
- **Clase Tailwind**: `bg-[#F5F3EF]`, `hover:bg-[#F5F3EF]`

## Color Blanco
- **Hex**: `#FFFFFF`
- **Uso**: Fondos de tarjetas, text blanco sobre colores oscuros
- **Clase Tailwind**: `bg-white`, `text-white`

## Grises Neutros

### Gray 100 (Bordes)
- **Hex**: `#DADADA`
- **Uso**: Bordes, divisores
- **Clase Tailwind**: `border-[#DADADA]`

### Gray 600 (Texto Secundario)
- **Hex**: `#6B6B6B`
- **Uso**: Texto secundario, hints, placeholders
- **Clase Tailwind**: `text-[#6B6B6B]`

## Colores de Estado

### Success
- **Hex**: `#2E7D32`
- **Uso**: Estados positivos, checkmarks, disponibilidad
- **Clase Tailwind**: `bg-[#2E7D32]`, `text-[#2E7D32]`

### Warning
- **Hex**: `#B7791F`
- **Uso**: Advertencias, estados pendientes
- **Clase Tailwind**: `bg-[#B7791F]`, `text-[#B7791F]`

### Error / Danger
- **Hex**: `#C0392B`
- **Uso**: Botones de eliminar, errores, alertas críticas
- **Clase Tailwind**: `bg-[#C0392B]`, `text-[#C0392B]`

### Info
- **Hex**: `#2F6F8F`
- **Uso**: Información, mensajes informativos
- **Clase Tailwind**: `bg-[#2F6F8F]`, `text-[#2F6F8F]`

## Fondos Gradiente
- **Header/Banner**: `from-[#4F6F52] via-[#455C47] to-[#C26D4A]`
- **Dark Mode**: `dark:from-[#455C47] dark:via-[#3F5C43] dark:to-[#985B42]`

## Implementación en CSS Variables

Todas las variables CSS están definidas en [app/globals.css](./app/globals.css):

```css
:root {
  --gm-olive: #4F6F52;
  --gm-olive-hover: #3F5C43;
  --gm-olive-pressed: #334B37;
  --gm-terracotta: #C26D4A;
  --gm-charcoal: #2E2E2E;
  --gm-sand: #F5F3EF;
  --gm-white: #FFFFFF;
  --gm-gray-100: #DADADA;
  --gm-gray-600: #6B6B6B;
  --gm-success: #2E7D32;
  --gm-warning: #B7791F;
  --gm-error: #C0392B;
  --gm-info: #2F6F8F;
}
```

## Archivos de Tokens
- [brand/tokens.json](./brand_kit/brand/tokens.json) - Token de colores en JSON
- [brand/tokens.css](./brand_kit/brand/tokens.css) - Token de colores en CSS

## Ejemplos de Uso

### Botón Primario
```tsx
<button className="bg-[#4F6F52] hover:bg-[#3F5C43] text-white px-4 py-2 rounded-lg">
  Guardar
</button>
```

### Precio Destacado
```tsx
<p className="text-[#C26D4A] font-bold text-2xl">
  $99.990
</p>
```

### Borde
```tsx
<div className="border-2 border-[#DADADA] dark:border-[#415543]">
  Contenido
</div>
```

### Input Focus
```tsx
<input className="focus:border-[#4F6F52] focus:ring-[#C26D4A]" />
```

## Dark Mode
En dark mode, se mantienen los mismos colores primarios con variantes más claras para garantizar contraste:
- Olive permanece igual: `#4F6F52`
- Terracotta se aclara a: `#E3BDAD` (variante 300)
- Fondos cambian a: `#F0F3F1` (olive-50)
- Bordes cambian a: `#415543` (olive-700)

## Referencias
- [Guía de Marca Completa](./brand_kit/README_Guia_de_Marca.md)
- [Logos](./brand_kit/logos/)
- [Logos SVG](./brand_kit/logos_svg/)
