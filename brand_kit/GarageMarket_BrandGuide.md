# Garage Market — Guía de Marca para Web App (UN SOLO ARCHIVO, SIN LOGOS)
_Versión: Final 1 • Sistema de diseño minimalista • Paleta azul + acento coral sutil • Modo Claro/Oscuro_

> **Contexto**
> - Esta guía omite los logos (ya los tienes).
> - Los colores son los que definimos previamente en la versión “Final 1” (azules) con un **acento coral sutil para UI**.
> - Está pensada para implementarse rápidamente en cualquier stack web (vanilla CSS, React, Tailwind, MUI, etc.).

---

## 1) Identidad y Principios

**Esencia:** simple, humana y práctica.  
**Promesa:** _“Publicá, vendé y listo”_.  
**Tono:** claro, cercano, sin jerga técnica innecesaria.  
**Sensación visual:** limpia, respirada, con foco en la acción (publicar/comprar).

**Do**
- Priorizar la legibilidad y el contraste.  
- Usar la paleta de forma austera (azul primario + acento coral solo en UI).  
- Mantener jerarquía tipográfica simple (2–3 tamaños por pantalla).

**Don’t**
- No usar degradados, 3D ni sombras pesadas en identidad/UI principal.  
- No usar coral como color de **texto de párrafos** o títulos extensos.  
- No introducir colores fuera del sistema sin justificación.

---

## 2) Paleta de Color (HEX)

### 2.1. Marca — Azules (Final 1)
- `blue-900`  ➜ **#143A73**  
- `blue-800`  ➜ **#18468B**  
- `blue-700`  ➜ **#1B54A6**  
- `blue-600`* ➜ **#1F63B3**  _(Primario UI)_  
- `blue-500`* ➜ **#2563EB**  _(Énfasis / links)_  
- `blue-300`  ➜ **#79A8F2**  
- `blue-100`  ➜ **#D6E4FF**

### 2.2. Neutros
- `bg`         ➜ **#FFFFFF**  
- `surface`    ➜ **#F6F8FB**  
- `text`       ➜ **#20242B**  
- `textMuted`  ➜ **#64748B**  
- `border`     ➜ **#E5E7EB**

### 2.3. Acento sutil (UI, **no** aplicar al logo)
- `coral-400` ➜ **#F2A698**  
- `coral-500` ➜ **#E88C76**

### 2.4. Estados (UI)
- `success` ➜ **#149E55**  
- `warning` ➜ **#B7791F**  
- `danger`  ➜ **#D14343**  
- `info`    ➜ **#0EA5E9**

---

## 3) Modo Oscuro — Overrides

**Neutros:**  
- `bg` ➜ **#0B1020**; `surface` ➜ **#0F1526**; `text` ➜ **#E6EBF5**; `textMuted` ➜ **#A3B0C5**; `border` ➜ **#25304A**

**Azules Dark (contraste ajustado):**  
- `blue-900` ➜ **#0F2E5E**; `blue-800` ➜ **#17417F**; `blue-700` ➜ **#1B54A6**;  
- `blue-600` ➜ **#2C73D2** _(Primario UI en dark)_; `blue-500` ➜ **#4F83FF** _(Links/énfasis en dark)_;  
- `blue-300` ➜ **#8FB3FF**; `blue-100` ➜ **#BFD2FF**

**Coral en Dark (suavizado):**  
- `coral-400` ➜ **#F0A99A**; `coral-500` ➜ **#E8917D**

---

## 4) Tokens de Diseño

### 4.1. CSS (copiar/pegar tal cual)
```css
:root{
  /* Marca — Azules Final 1 */
  --gm-blue-900:#143A73;
  --gm-blue-800:#18468B;
  --gm-blue-700:#1B54A6;
  --gm-blue-600:#1F63B3; /* Primario UI */
  --gm-blue-500:#2563EB; /* Links / Énfasis */
  --gm-blue-300:#79A8F2;
  --gm-blue-100:#D6E4FF;

  /* Acento para UI (no usar en logo) */
  --gm-coral-400:#F2A698;
  --gm-coral-500:#E88C76;

  /* Neutros */
  --gm-bg:#FFFFFF;
  --gm-surface:#F6F8FB;
  --gm-text:#20242B;
  --gm-text-muted:#64748B;
  --gm-border:#E5E7EB;

  /* Estados */
  --gm-success:#149E55;
  --gm-warning:#B7791F;
  --gm-danger:#D14343;
  --gm-info:#0EA5E9;

  /* Extras */
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
  --gm-blue-600:#2C73D2; /* Primario UI en dark */
  --gm-blue-500:#4F83FF; /* Links/énfasis en dark */
  --gm-blue-300:#8FB3FF;
  --gm-blue-100:#BFD2FF;

  --gm-coral-400:#F0A99A;
  --gm-coral-500:#E8917D;

  --gm-focus:0 0 0 3px rgba(79,131,255,.35);
  --gm-shadow:0 8px 24px rgba(0,0,0,.35);
}
```

### 4.2. JSON (para theming o design tokens)
```json
{
  "blue":{"900":"#143A73","800":"#18468B","700":"#1B54A6","600":"#1F63B3","500":"#2563EB","300":"#79A8F2","100":"#D6E4FF"},
  "coral":{"400":"#F2A698","500":"#E88C76"},
  "neutrals":{"bg":"#FFFFFF","surface":"#F6F8FB","text":"#20242B","textMuted":"#64748B","border":"#E5E7EB"},
  "states":{"success":"#149E55","warning":"#B7791F","danger":"#D14343","info":"#0EA5E9"},
  "darkOverrides":{
    "bg":"#0B1020","surface":"#0F1526","text":"#E6EBF5","textMuted":"#A3B0C5","border":"#25304A",
    "blue":{"900":"#0F2E5E","800":"#17417F","700":"#1B54A6","600":"#2C73D2","500":"#4F83FF","300":"#8FB3FF","100":"#BFD2FF"},
    "coral":{"400":"#F0A99A","500":"#E8917D"}
  }
}
```

---

## 5) Tipografía

**Sugeridas:** Inter / Manrope / System UI stack (`system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`).

**Escala:** H1 28–32/700 · H2 22–24/600 · H3 18–20/600 · Body 16/400 · Small 12–14/400.  
`line-height` 1.35–1.55.

---

## 6) Espaciado, Grid y Radios

- Sistema de 8 pt: 4, 8, 12, 16, 20, 24, 32, 40.  
- Container máx.: 1100–1200 px.  
- Grid: 12 cols / gap 16.  
- `border-radius`: 12 px.

---

## 7) Componentes — Patrones de referencia

### 7.1. Botón Primario
```css
.btn-primary{
  background: var(--gm-blue-600);
  color:#fff;
  border:0;
  border-radius: var(--gm-radius);
  padding:10px 14px;
  font-weight:600;
  box-shadow: var(--gm-shadow);
  transition: background .15s ease;
}
.btn-primary:hover{ background: color-mix(in srgb, var(--gm-blue-700) 90%, var(--gm-blue-600)); }
.btn-primary:focus{ outline: none; box-shadow: var(--gm-focus); }
.btn-primary:disabled{ opacity:.55; cursor:not-allowed; }
```

### 7.2. Botón Secundario (coral sutil)
```css
.btn-secondary{
  background: transparent;
  color: var(--gm-text);
  border:1px solid var(--gm-coral-500);
  border-radius: var(--gm-radius);
  padding:10px 14px;
  font-weight:600;
}
.btn-secondary:hover{
  background: color-mix(in srgb, var(--gm-coral-500) 12%, transparent);
}
```

### 7.3. Input
```css
.input{
  width:100%;
  padding:10px 12px;
  border-radius: var(--gm-radius);
  border:1px solid var(--gm-border);
  background: var(--gm-bg);
  color: var(--gm-text);
}
.input::placeholder{ color: var(--gm-text-muted); }
.input:focus{
  outline: none;
  border-color: var(--gm-blue-600);
  box-shadow: var(--gm-focus);
}
```

### 7.4. Card
```css
.card{
  background: var(--gm-bg);
  border:1px solid var(--gm-border);
  border-radius: var(--gm-radius);
  box-shadow: var(--gm-shadow);
  padding:16px;
}
.badge{
  display:inline-block;
  padding:4px 8px;
  border-radius:999px;
  border:1px solid var(--gm-border);
  background: color-mix(in srgb, var(--gm-coral-400) 18%, transparent);
  font-weight:600;
  font-size:.8rem;
}
.price{ color: var(--gm-blue-600); font-weight:700; }
.price .off{ color: var(--gm-text-muted); text-decoration: line-through; margin-left:6px; }
```

---

## 8) Integración (Light/Dark)

### 8.1. Toggle de tema (HTML/JS)
```html
<script>
  function toggleTheme(){
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
  }
</script>
<button onclick="toggleTheme()">Cambiar tema</button>
```

### 8.2. React — Hook mínimo
```jsx
import { useEffect } from "react";

export function useTheme(defaultMode="light"){
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", defaultMode);
  }, [defaultMode]);

  const toggle = () => {
    const html = document.documentElement;
    html.setAttribute("data-theme", html.getAttribute("data-theme")==="dark" ? "light" : "dark");
  };

  return { toggle };
}
```

---

## 9) Accesibilidad (WCAG AA)

- Texto `#20242B` sobre `#FFFFFF` → AA (cuerpo 16/400, títulos ≥ 18/700).  
- Botón primario: texto blanco sobre `blue-600` → AA.  
- Dark: `#E6EBF5` sobre `#0B1020` → AA.  
- Coral: evitarlo como color de texto extenso; usar en superficies/badges con texto contrastante.
- Foco visible: `box-shadow: var(--gm-focus)` (≥ 3px).

---

## 10) Contenido y Voz

- **Titulares:** breves, acción clara.  
- **Cuerpo:** frases simples; sin tecnicismos.  
- **Errores:** orientar al usuario (próximo paso).  
- **Microcopys:** coral solo como detalle UI, no en texto principal.

---

## 11) Íconos y OG

- **Favicons:** 16/32/48 px.  
- **App icons (PWA):** 180/192/512 px (light y dark).  
- **Open Graph:** 1200×630 con título y franja coral sutil si aplica.

_Naming sugerido:_
```
/assets/icons/favicon-16.png
/assets/icons/favicon-32.png
/assets/icons/favicon-48.png
/assets/icons/app-icon-light-180.png
/assets/icons/app-icon-dark-180.png
/assets/icons/app-icon-light-192.png
/assets/icons/app-icon-dark-192.png
/assets/icons/app-icon-light-512.png
/assets/icons/app-icon-dark-512.png
/assets/og/og-1200x630.png
```

---

## 12) Checklist de QA

- [ ] Contraste AA en textos, botones y links (claro/oscuro).  
- [ ] Tokens aplicados globalmente (evitar hex fuera del set).  
- [ ] Estados `hover/focus/disabled` presentes.  
- [ ] Favicons/app‑icons exportados y referenciados.  
- [ ] OG card correcta al compartir.  
- [ ] (Si se usan logos) versión adecuada para fondo claro/oscuro; márgenes seguros.

---

## 13) Roadmap (opcional)

- Mapear tokens a Tailwind (`theme.extend.colors.gm.*`).  
- ThemeProvider con `prefers-color-scheme`.  
- Documentar Button/Input/Card/Badge + patrones List/Empty.

---

## 14) Resumen Ejecutivo

- Sistema minimalista con **azul** como primario y **coral** para acentos de UI.  
- **Tokens** listos (CSS/JSON) + **modo oscuro** por `data-theme`.  
- Foco en **legibilidad**, **accesibilidad AA** y **acciones claras**.

_Fin — Garage Market, Guía de Marca (archivo único)._ 
