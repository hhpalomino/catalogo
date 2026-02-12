# 🎨 SISTEMA DE BRANDING CENTRALIZADO

## Resumen

Toda la configuración de branding de **Garage Market** está centralizada en un único archivo:

```
lib/branding-config.ts
```

Si la guía de marca cambia, **solo tienes que editar ese archivo** y toda la aplicación se actualizará automáticamente.

---

## 📍 Ubicación de la Configuración

### Archivo Principal
- **Ruta**: `lib/branding-config.ts`
- **Contiene**: Colores, logos, fuentes, espaciado, sombras y componentes

### Estilos Globales (Variables CSS)
- **Ruta**: `app/globals.css`
- **Contiene**: Variables CSS que se generan desde `branding-config.ts`

---

## 🎯 CAMBIOS RÁPIDOS

### 1️⃣ Cambiar Paleta Azul/Coral
**Ubicación**: `BRAND_CONFIG.colors`

```typescript
blue: {
  900: "#143A73",
  800: "#18468B",
  700: "#1B54A6",
  600: "#1F63B3",
  500: "#2563EB",
  300: "#79A8F2",
  100: "#D6E4FF",
},
coral: {
  400: "#F2A698",
  500: "#E88C76",
},
neutrals: {
  bg: "#FFFFFF",
  surface: "#F6F8FB",
  text: "#20242B",
  textMuted: "#64748B",
  border: "#E5E7EB",
},
states: {
  success: "#149E55",
  warning: "#B7791F",
  danger: "#D14343",
  info: "#0EA5E9",
},
darkOverrides: {
  bg: "#0B1020",
  surface: "#0F1526",
  text: "#E6EBF5",
  textMuted: "#A3B0C5",
  border: "#25304A",
  blue: {
    900: "#0F2E5E",
    800: "#17417F",
    700: "#1B54A6",
    600: "#2C73D2",
    500: "#4F83FF",
    300: "#8FB3FF",
    100: "#BFD2FF",
  },
  coral: {
    400: "#F0A99A",
    500: "#E8917D",
  },
},
```

> **Ejemplo**: Para cambiar el azul principal, actualiza `blue.600` y `blue.500`.

### 2️⃣ Cambiar Logo
**Ubicación**: `BRAND_CONFIG.logos`

```typescript
logos: {
  lightMode: {
    src: "/logos/gm-icon-light.svg",  // Logo para modo claro
    width: 48,
    height: 48,
  },
  darkMode: {
    src: "/logos/gm-icon-dark.svg",   // Logo para modo oscuro
    width: 48,
    height: 48,
  }
}
```

> **Pasos**:
> 1. Coloca el nuevo logo en `public/logos/`
> 2. Actualiza las rutas en `BRAND_CONFIG.logos`
> 3. ¡Listo! El logo se actualizará en toda la app

### 3️⃣ Cambiar Colores de Dark Mode
**Ubicación**: `BRAND_CONFIG.colors.darkOverrides`

```typescript
darkOverrides: {
  bg: "#0B1020",
  surface: "#0F1526",
  text: "#E6EBF5",
  textMuted: "#A3B0C5",
  border: "#25304A",
  blue: {
    900: "#0F2E5E",
    800: "#17417F",
    700: "#1B54A6",
    600: "#2C73D2",
    500: "#4F83FF",
    300: "#8FB3FF",
    100: "#BFD2FF",
  },
  coral: {
    400: "#F0A99A",
    500: "#E8917D",
  },
},
```

### 5️⃣ Cambiar Tipografía
**Ubicación**: `BRAND_CONFIG.typography`

```typescript
typography: {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  sizes: { xs, sm, base, lg, xl, "2xl", "3xl", "4xl" },
  weights: { light: 300, normal: 400, semibold: 600, bold: 700 }
}
```

### 6️⃣ Cambiar Espaciado Global
**Ubicación**: `BRAND_CONFIG.spacing`

```typescript
spacing: {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
}
```

---

## 🔗 Cómo Usan Esto Los Componentes

### En Componentes React
```typescript
import BRAND_CONFIG from "@/lib/branding-config";

export default function MyComponent() {
  return (
    <button 
      style={{ backgroundColor: BRAND_CONFIG.colors.primary.main }}
    >
      Mi Botón
    </button>
  );
}
```

### En Variables CSS
Los colores se enumeran en `app/globals.css`:
```css
:root {
  --gm-blue-900:#143A73;
  --gm-blue-800:#18468B;
  --gm-blue-700:#1B54A6;
  --gm-blue-600:#1F63B3;
  --gm-blue-500:#2563EB;
  --gm-blue-300:#79A8F2;
  --gm-blue-100:#D6E4FF;
  --gm-coral-400:#F2A698;
  --gm-coral-500:#E88C76;
  --gm-bg:#FFFFFF;
  --gm-surface:#F6F8FB;
  --gm-text:#20242B;
  --gm-text-muted:#64748B;
  --gm-border:#E5E7EB;
  --gm-success:#149E55;
  --gm-warning:#B7791F;
  --gm-danger:#D14343;
  --gm-info:#0EA5E9;
  --gm-radius:12px;
  --gm-focus:0 0 0 3px rgba(37,99,235,.25);
  --gm-shadow:0 4px 12px rgba(0,0,0,.08);
}
html[data-theme="dark"]{
  --gm-bg:#0B1020;
  --gm-surface:#0F1526;
  --gm-text:#E6EBF5;
  --gm-text-muted:#A3B0C5;
  --gm-border:#25304A;
  --gm-blue-900:#0F2E5E;
  --gm-blue-800:#17417F;
  --gm-blue-700:#1B54A6;
  --gm-blue-600:#2C73D2;
  --gm-blue-500:#4F83FF;
  --gm-blue-300:#8FB3FF;
  --gm-blue-100:#BFD2FF;
  --gm-coral-400:#F0A99A;
  --gm-coral-500:#E8917D;
  --gm-focus:0 0 0 3px rgba(79,131,255,.35);
  --gm-shadow:0 8px 24px rgba(0,0,0,.35);
}
```

### Con Tailwind CSS
```typescript
// Los colores se usan en clases Tailwind
className="bg-[#4F6F52] text-white hover:bg-[#3F5C43]"

// Una mejor práctica es usar las propiedades preconstruidas:
className={BRAND_CONFIG.components.button.primary.bg}
```

---

## 📋 Secciones de la Configuración

| Sección | Propósito | Ubicación |
|---------|-----------|-----------|
| **name, tagline** | Nombre y descripción de la marca | `BRAND_CONFIG.name` |
| **colors** | Toda la paleta de colores | `BRAND_CONFIG.colors` |
| **logos** | Rutas y tamaños de logos | `BRAND_CONFIG.logos` |
| **typography** | Fuentes y tamaños | `BRAND_CONFIG.typography` |
| **spacing** | Espaciado consistente | `BRAND_CONFIG.spacing` |
| **radius** | Radio de bordes (border-radius) | `BRAND_CONFIG.radius` |
| **shadows** | Sombras de elementos | `BRAND_CONFIG.shadows` |
| **components** | Clases Tailwind preconstruidas | `BRAND_CONFIG.components` |
| **banner** | Estilos del banner hero | `BRAND_CONFIG.banner` |
| **transitions** | Duraciones de animaciones | `BRAND_CONFIG.transitions` |

---

## 🎨 ESCENARIO: LA GUÍA DE MARCA CAMBIÓ

### Si solo cambian los colores:
1. Abre `lib/branding-config.ts`
2. Busca `BRAND_CONFIG.colors`
3. Actualiza los valores hex (ej: `#4F6F52` → `#NUEVOR`)
4. **¡Listo!** Toda la app refleja los nuevos colores

### Si hay nuevo logo:
1. Coloca los archivos SVG en `public/logos/`
2. Abre `lib/branding-config.ts`
3. Busca `BRAND_CONFIG.logos`
4. Actualiza las rutas `src`
5. **¡Listo!** El logo aparece en toda la app

### Si hay nueva tipografía:
1. Abre `lib/branding-config.ts`
2. Busca `BRAND_CONFIG.typography`
3. Actualiza `fontFamily.sans` con la nueva fuente
4. **¡Listo!** Todos los textos usan la nueva fuente

### Si hay nuevos colores de dark mode:
1. Abre `lib/branding-config.ts`
2. Busca `BRAND_CONFIG.colors.neutral`
3. Actualiza los colores del dark mode
4. **¡Listo!** El modo oscuro refleja los nuevos colores

---

## 🔍 Componentes que Usan Esta Configuración

Los siguientes componentes ya están preparados para usar `branding-config.ts`:

- ✅ `Header.tsx` - Logo
- ✅ `AuthButton.tsx` - Colores
- ✅ `IntroductionBanner.tsx` - Banner y colores
- ✅ `AdminSidebar.tsx` - Colores y estilos
- ✅ `AdminPageClient.tsx` - Colores e iconos
- ✅ `ProductCard.tsx` - Colores y badges
- ✅ `Input.tsx` - Colores y estilos
- ✅ `Modal.tsx` - Colores y estilos
- ✅ `Button.tsx` - Colores primarios

---

## 📦 Estructura del Archivo

```
lib/branding-config.ts
├── BRAND_CONFIG (objeto principal)
│   ├── name, tagline, description
│   ├── colors
│   │   ├── primary
│   │   ├── accent
│   │   ├── neutral
│   │   ├── background
│   │   ├── text
│   │   ├── border
│   │   ├── states
│   │   └── product
│   ├── logos
│   ├── typography
│   ├── spacing
│   ├── radius
│   ├── shadows
│   ├── components
│   ├── banner
│   └── transitions
├── Funciones auxiliares (getPrimaryColor, etc.)
└── export default BRAND_CONFIG
```

---

## 🚀 Beneficios

✅ **Un solo lugar**: Toda la config en `lib/branding-config.ts`  
✅ **Cambios instantáneos**: Actualiza una vez, toda la app se actualiza  
✅ **Sin duplicación**: No hay colores hardcodeados en componentes  
✅ **Consistencia**: Todos los colores, fuentes y espaciado son consistentes  
✅ **Fácil de mantener**: Si la marca cambia, sabes exactamente dónde buscar  
✅ **Type-safe**: TypeScript valida que uses valores válidos  

---

## 📝 Próximos Pasos

Si la guía de marca cambia:
1. Ve a `lib/branding-config.ts`
2. Identifica qué secciones cambiaron
3. Actualiza solo esas secciones
4. El cambio se refleja automáticamente en toda la app
5. ✅ ¡Hecho!

**No necesitas:**
- Editar componentes individuales
- Buscar colores hardcodeados
- Actualizar múltiples archivos

---

## ❓ Preguntas Frecuentes

**P: ¿Y si quiero cambiar un color solo en un componente?**  
R: Crea una variable específica en `BRAND_CONFIG.components` para ese caso.

**P: ¿Dónde están los colores de los estados del producto?**  
R: En `BRAND_CONFIG.product` (pending, available, sold).

**P: ¿Cómo cambiaban siempre los colores del dark mode?**  
R: Los nuevos componentes usan `neutral.darkBg`, `neutral.darkBorder`, etc.

**P: ¿Puedo agregar más propiedades?**  
R: Sí, agrega nuevas secciones en `BRAND_CONFIG` según necesites.

---

## 📚 Referencia Rápida

| Necesito cambiar | Voy a | Busco |
|------------------|-------|-------|
| Color primario | `lib/branding-config.ts` | `colors.primary.main` |
| Color secundario | `lib/branding-config.ts` | `colors.accent.main` |
| Logo | `lib/branding-config.ts` | `logos.src` |
| Dark mode | `lib/branding-config.ts` | `colors.neutral` |
| Fuente | `lib/branding-config.ts` | `typography.fontFamily` |
| Espaciado | `lib/branding-config.ts` | `spacing` |
| Estados (éxito, error) | `lib/branding-config.ts` | `colors.states` |

---

**¡Listo! Ahora toda la configuración de branding está centralizada y lista para cambios rápidos.**
