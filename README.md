# Portfolio

Portfolio personal desarrollado con React, Vite y Tailwind CSS. Incluye fondos dinámicos, partículas animadas y diseño responsive.

## Características

- **Fondos dinámicos por sección** con transiciones suaves al hacer scroll
- **Partículas animadas** que cambian de color según el fondo activo
- **Tema claro/oscuro** con toggle
- **Multiidioma** (Español/Inglés)
- **Diseño responsive** para todos los dispositivos
- **Animaciones de scroll** para elementos y tarjetas
- **Secciones**: Hero, About, Projects, Skills, Contact

## Tecnologías

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- EmailJS

## 📦 Instalación

```bash
npm install
```

## Scripts

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

## Configuración de Fondos

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

## 📝 Notas

- Las imágenes de fondo deben estar en `src/assets/backgrounds/`
- Los fondos cambian automáticamente según la sección visible
- Las partículas cambian de color según el fondo activo
- La ruta base está configurada como `/Portfolio/` en `vite.config.js`
