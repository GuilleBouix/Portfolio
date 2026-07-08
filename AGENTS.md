# Instrucciones para Agentes de IA - Portafolio Astro

## Arquitectura del Proyecto

Este es un portafolio personal construido con **Astro 5.18** como generador de sitio estático, desplegado en Vercel. Usa **Tailwind CSS 4.1** para estilos y **Alpine.js** + JavaScript vanilla para interactividad.

### Estructura Principal

- `Layout.astro`: Base con SEO, Google Tag Manager y navegación
- Componentes en `src/components/`: About, Projects, Skills, etc.
- Páginas en `src/pages/`: index.astro y proyectos individuales
- Scripts en `src/scripts/`: Animaciones AOS, navbar móvil, email

### API y Tracking

- Endpoint `/api/track` para leads (no prerenderizable)
- Integración con Google Apps Script para tracking → Google Sheets

## Convenciones Específicas

### Sistema de Color

Usa variables CSS en `@theme` de `global.css`, no `tailwind.config.js`:

```css
--color-surface: #111317;
--color-border: #474747;
```

### Animaciones

- AOS (Animate On Scroll) con atributos `data-aos="zoom-in"` y delays
- Inicialización automática en `aos.ts`

### Interactividad

- Scripts vanilla cargados cliente-side
- Navbar móvil con animación en cascada (setTimeout secuencial)
- Cierra menú al clickear fuera

### Props en Componentes

- Siempre incluye defaults: `logoSize = "2xl"`, `tech = []`

## Comandos de Desarrollo

Ejecuta automáticamente estos comandos para validación:

```bash
pnpm dev      # Servidor de desarrollo
pnpm build    # Construir para producción
pnpm preview  # Previsualizar build
```

## Posibles Trampas

- **GTM_ID**: Lee desde `import.meta.env.PUBLIC_GTM_ID`
- **Scripts**: No requieren bundling, se cargan automáticamente
- **API tracking**: Tiene `prerender = false`

## Documentación Relacionada

- [LEADS_TRACKING_TEMPLATES.md](LEADS_TRACKING_TEMPLATES.md): Sistema de tracking de leads
- [README.md](README.md): Información general del proyecto

## Archivos Clave para Patrones

- [ProjectCard.astro](src/components/Projects/ProjectCard.astro): Componente reutilizable con props y slots
- [global.css](src/styles/global.css): Estilos globales y animaciones
- [navbar.ts](src/scripts/navbar.ts): Interactividad DOM y eventos
- [Layout.astro](src/layouts/Layout.astro): SEO y metadatos
