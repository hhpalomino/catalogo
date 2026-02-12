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
    // Paleta azul principal
    blue: {
      900: "#143A73",
      800: "#18468B",
      700: "#1B54A6",
      600: "#1F63B3",
      500: "#2563EB",
      300: "#79A8F2",
      100: "#D6E4FF",
    },
    // Coral acento UI
    coral: {
      400: "#F2A698",
      500: "#E88C76",
    },
    // Neutrales
    neutrals: {
      bg: "#FFFFFF",
      surface: "#F6F8FB",
      text: "#20242B",
      textMuted: "#64748B",
      border: "#E5E7EB",
    },
    // Estados UI
    states: {
      success: "#149E55",
      warning: "#B7791F",
      danger: "#D14343",
      info: "#0EA5E9",
    },
    // Overrides para modo oscuro
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
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LOGOS
  // ──────────────────────────────────────────────────────────────────────────
  logos: {
    // Logo para modo claro
    lightMode: {
      src: "/logos/logo-light.png",
      alt: "Garage Market Logo claro",
      width: 48,
      height: 48,
    },
    // Logo para modo oscuro
    darkMode: {
      src: "/logos/logo-dark.png",
      alt: "Garage Market Logo oscuro",
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
export const getPrimaryColor = () => BRAND_CONFIG.colors.blue[500];

/**
 * Obtiene el color de acento
 * Usa coral[500] como color de acento
 */
export const getAccentColor = () => BRAND_CONFIG.colors.coral[500];

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
