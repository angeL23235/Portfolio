# Portfolio

Portfolio personal desarrollado con React, Vite y Tailwind CSS. Incluye fondos dinámicos, partículas animadas y diseño responsive.

## 🚀 Características

- **Fondos dinámicos por sección** con transiciones suaves al hacer scroll
- **Partículas animadas** que cambian de color según el fondo activo
- **Tema claro/oscuro** con toggle
- **Multiidioma** (Español/Inglés)
- **Diseño responsive** para todos los dispositivos
- **Animaciones de scroll** para elementos y tarjetas
- **Secciones**: Hero, About, Projects, Skills, Contact

## 🛠️ Tecnologías

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- EmailJS

## 📦 Instalación

```bash
npm install
```

## 🏃 Scripts

```bash
npm run dev      # Servidor de desarrollo

```

## 📁 Estructura

```
src/
├── components/        # Componentes React
│   ├── AnimatedBackground/   # Partículas animadas
│   ├── SectionBackground/     # Fondos por sección
│   ├── Hero/
│   ├── About/
│   ├── Projects/
│   ├── Skills/
│   ├── Contact/
│   └── ...
├── contexts/          # Contextos (Theme, Language)
├── hooks/             # Custom hooks
├── assets/            # Imágenes y recursos
│   └── backgrounds/   # Fondos de sección
└── translations.js   # Traducciones
```

## 🎨 Configuración de Fondos

Los fondos se configuran en `src/App.jsx`:

```jsx
const sectionBackgrounds = [
  { id: 'home', image: background1 },
  { id: 'about', image: background1 },
  { id: 'projects', image: background1 },
  { id: 'skills', image: background2 },
  { id: 'contact', image: background2 }
];
```

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Actions (Automático)

1. El workflow se ejecuta automáticamente al hacer push a `main`
2. Ve a Settings > Pages en tu repositorio
3. Selecciona "GitHub Actions" como fuente

### Opción 2: Manual

```bash
npm run build
```

Luego sube el contenido de la carpeta `dist` a la rama `gh-pages` o usa:

```bash
npm run deploy
```

**Importante**: Asegúrate de que en Settings > Pages esté configurado:
- Source: `gh-pages` branch o `GitHub Actions`
- El repositorio se llama exactamente `Portfolio` (con mayúscula)

## 📝 Notas

- Las imágenes de fondo deben estar en `src/assets/backgrounds/`
- Los fondos cambian automáticamente según la sección visible
- Las partículas cambian de color según el fondo activo
- La ruta base está configurada como `/Portfolio/` en `vite.config.js`