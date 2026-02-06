/**
 * CONFIGURACIÓN CENTRALIZADA DE BRANDING
 * 
 * Este archivo contiene TODA la configuración de branding de Garage Market.
 * Si la guía de marca cambia, actualiza SOLO este archivo y toda la aplicación
 * se actualizará automáticamente.
 * 
 * CAMBIOS RÁPIDOS:
 * - Colores: Ver sección "COLORES"
 * - Logo: Ver sección "LOGOS"
 * - Fuentes: Ver sección "TIPOGRAFÍA"
 * - Espaciado: Ver sección "ESPACIADO"
 */

// ============================================================================
// CONFIGURACIÓN DE MARCA
// ============================================================================

export const BRAND_CONFIG = {
  // ──────────────────────────────────────────────────────────────────────────
  // INFORMACIÓN GENERAL
  // ──────────────────────────────────────────────────────────────────────────
  name: "Garage Market",
  tagline: "Tienda de productos",
  description: "Catálogo de Garage Market",

  // ──────────────────────────────────────────────────────────────────────────
  // COLORES - PALETA PRINCIPAL
  // ──────────────────────────────────────────────────────────────────────────
  colors: {
    // Primario (Olive/Verde)
    primary: {
      main: "#4F6F52",
      hover: "#3F5C43",
      pressed: "#334B37",
      light: "#6B8C6F",
      lighter: "#F0F3F1",
    },

    // Acento (Terracotta/Naranja)
    accent: {
      main: "#C26D4A",
      hover: "#B05A3A",
      light: "#E8B5A0",
    },

    // Neutral (Charcoal - Dark Mode)
    neutral: {
      charcoal: "#2E2E2E",
      darkBg: "#2E2E2E",
      darkBgAlt: "#455C47",
      darkCardBg: "#2E2E2E",
      darkCardBgAlt: "#455C47",
      darkBorder: "#415543",
    },

    // Fondo (Sand)
    background: {
      main: "#F5F3EF",
      light: "#FFFFFF",
    },

    // Texto
    text: {
      primary: "#2E2E2E",
      secondary: "#6B6B6B",
      light: "#DADADA",
      white: "#FFFFFF",
    },

    // Bordes
    border: {
      main: "#DADADA",
      dark: "#415543",
    },

    // Estados
    states: {
      success: "#2E7D32",
      warning: "#B7791F",
      error: "#C0392B",
      info: "#2F6F8F",
      successBg: "#D4EDDA",
      errorBg: "#F8D7DA",
    },

    // Específicos por estado de producto
    product: {
      pending: {
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        badge: "#B7791F",
      },
      available: {
        text: "text-green-600",
        bg: "bg-green-50",
        badge: "#2E7D32",
      },
      sold: {
        text: "text-[#4F6F52]",
        bg: "bg-[#F0F3F1]",
        darkBg: "dark:bg-[#455C47]",
        badge: "#4F6F52",
      },
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LOGOS
  // ──────────────────────────────────────────────────────────────────────────
  logos: {
    // Logo para modo claro
    lightMode: {
      src: "/logos/gm-icon-light.svg",
      alt: "Garage Market Logo",
      width: 48,
      height: 48,
    },
    // Logo para modo oscuro
    darkMode: {
      src: "/logos/gm-icon-dark.svg",
      alt: "Garage Market Logo",
      width: 48,
      height: 48,
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TIPOGRAFÍA
  // ──────────────────────────────────────────────────────────────────────────
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    weights: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ESPACIADO
  // ──────────────────────────────────────────────────────────────────────────
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // RADIOS (border-radius)
  // ──────────────────────────────────────────────────────────────────────────
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SOMBRAS
  // ──────────────────────────────────────────────────────────────────────────
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // COMPONENTES ESPECÍFICOS
  // ──────────────────────────────────────────────────────────────────────────
  components: {
    header: {
      height: "h-16",
      bgLight: "bg-white",
      bgDark: "dark:bg-[#2E2E2E]",
      borderColor: "border-[#DADADA] dark:border-[#415543]",
    },
    button: {
      primary: {
        bg: "bg-[#4F6F52]",
        hover: "hover:bg-[#3F5C43]",
        text: "text-white",
      },
      secondary: {
        bg: "bg-white",
        hover: "hover:bg-[#F5F3EF]",
        text: "text-[#2E2E2E]",
      },
    },
    input: {
      bgLight: "bg-white",
      bgDark: "dark:bg-[#455C47]",
      borderColor: "border-[#DADADA] dark:border-[#415543]",
      focusBorder: "focus:border-[#4F6F52]",
      focusRing: "focus:ring-[#C26D4A]",
    },
    card: {
      bgLight: "bg-white",
      bgDark: "dark:bg-[#2E2E2E]",
      borderColor: "border-[#DADADA] dark:border-[#415543]",
    },
    sidebar: {
      bgLight: "bg-white",
      bgDark: "dark:bg-[#2E2E2E]",
      activeItem: "bg-[#4F6F52] dark:bg-[#455C47] text-white",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BANNER / HERO
  // ──────────────────────────────────────────────────────────────────────────
  banner: {
    bgColor: "#4F6F52",
    bgColorDark: "#3F5C43",
    textColor: "#FFFFFF",
    buttonBgLight: "bg-white",
    buttonBgDark: "dark:bg-[#2E2E2E]",
    buttonTextLight: "text-[#4F6F52]",
    buttonTextDark: "dark:text-white",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TRANSICIONES Y ANIMACIONES
  // ──────────────────────────────────────────────────────────────────────────
  transitions: {
    fast: "transition-all duration-200",
    normal: "transition-all duration-300",
    slow: "transition-all duration-500",
  },
} as const;

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Obtiene el color primario
 */
export const getPrimaryColor = () => BRAND_CONFIG.colors.primary.main;

/**
 * Obtiene el color de acento
 */
export const getAccentColor = () => BRAND_CONFIG.colors.accent.main;

/**
 * Obtiene el logo según el modo
 */
export const getLogoDark = () => BRAND_CONFIG.logos.darkMode;
export const getLogoLight = () => BRAND_CONFIG.logos.lightMode;

/**
 * Obtiene las clases Tailwind para un botón primario
 */
export const getPrimaryButtonClasses = () =>
  `${BRAND_CONFIG.components.button.primary.bg} ${BRAND_CONFIG.components.button.primary.hover} ${BRAND_CONFIG.components.button.primary.text}`;

/**
 * Obtiene las clases Tailwind para un input
 */
export const getInputClasses = () =>
  `${BRAND_CONFIG.components.input.bgLight} ${BRAND_CONFIG.components.input.bgDark} ${BRAND_CONFIG.components.input.borderColor}`;

export default BRAND_CONFIG;
