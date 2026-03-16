# Buscador de Imágenes - Resumen del Proyecto

## Lo que se hizo

### 1. Mejoras en el código
- Token de API movido a variable de entorno (.env) por seguridad
- Estados de loading, error y "sin resultados"
- Accesibilidad: labels, aria-label, roles, alt en imágenes
- Eliminado console.log

### 2. Diseño Responsive
- 3 columnas en desktop
- 2 columnas en tablet (900px)
- 1 columna en móvil (600px)

### 3. Estilizado
- Header con gradiente violeta
- Tarjetas con sombras suaves, bordes redondeados
- Transiciones hover
- Input redondeado con focus mejorado

## Comandos útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Deploy a Vercel
# 1. Ir a vercel.com
# 2. Importar repositorio
# 3. Agregar variable: VITE_UNSPLASH_ACCESS_KEY
# 4. Deploy
```

## Archivos principales
- `src/App.jsx` - Componente principal
- `src/header.css` - Estilos del header
- `src/content.css` - Contenedor y grid responsive
- `src/article.css` - Tarjetas de imágenes
- `.env` - Variables de entorno (no subir a git)

## Git
- Repo: https://github.com/rlunasanchez/buscador-imagenes.git
- Commits subidos: 5

### 5. Footer
- Agregado footer con "Derechos reservados Rodrigo Luna 2026"

### 6. Tecnologías del Proyecto
- Botón en el header para ver tecnologías usadas
- Modal con información de: React, Vite, Formik, Unsplash API, CSS3, JavaScript ES6+

### 7. Botón Responsive
- Botón de tecnologías responsive para mobile y desktop