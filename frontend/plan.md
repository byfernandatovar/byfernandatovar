# Plan de Implementación - By Fernanda Tovar

## 📋 Resumen

Implementar tres componentes para el sitio:
1. **Sanity CMS** - Solo para editar proyectos del portafolio
2. **Vercel** - Para hosting con deploy automático
3. **Meta Pixel** - Para analytics de Facebook

**Importante:** Solo el portafolio será editable. Las páginas Inicio, Sobre mí y Contacto serán estáticas (hardcoded).

---

## 🎯 Estructura del Sitio

| Página | Tipo | Contenido |
|--------|------|-----------|
| Inicio | Estático | Hero + proyectos destacados (desde Sanity) |
| Sobre mí | Estático | Todo hardcoded |
| Portafolio | Dinámico | Proyectos desde Sanity CMS |
| Contacto | Estático | Todo hardcoded |

---

## 📦 Fase 1: Sanity CMS (Solo Portafolio)

### Paso 1: Crear cuenta y proyecto
1. Ir a sanity.io y crear cuenta
2. Crear nuevo proyecto
3. Guardar el Project ID

### Paso 2: Instalar dependencias
```bash
npm install @sanity/client @sanity/image-url
npm install -D sanity @sanity/types
```

### Paso 3: Crear estructura de archivos
```
/sanity
  /schemas
    - project.ts
    - index.ts
  - sanity.config.ts

/app
  /lib
    - sanity.client.ts
    - sanity.queries.ts
    - sanity.image.ts
```

### Paso 4: Configurar schema de proyectos
Crear schema con estos campos:
- Título
- Slug (auto-generado)
- Categoría
- Descripción corta
- Descripción larga
- Imagen principal
- Galería de imágenes
- Fecha del proyecto
- Destacado (sí/no)
- Orden
- Tags
- Cliente
- Link externo

### Paso 5: Configurar Sanity Studio
- Usar Sanity Studio hosteado (más fácil)
- URL: `https://tuproyecto.sanity.studio`

### Paso 6: Variables de entorno
Crear `.env`:
```
SANITY_PROJECT_ID=tu_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2024-11-21
```

### Paso 7: Configurar cliente en el frontend
- Conectar app con Sanity
- Crear queries para obtener proyectos
- Configurar URLs de imágenes

### Paso 8: Integrar en componentes
- Usar loaders de React Router para fetch de datos
- Crear componentes de portafolio que usen los datos de Sanity
- Página de inicio solo muestra proyectos destacados

---

## 🚀 Fase 2: Vercel Deployment

### Paso 1: Preparar el proyecto
Crear `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build/client",
  "framework": null
}
```

### Paso 2: Conectar con Vercel
1. Crear cuenta en vercel.com
2. Conectar repositorio de GitHub
3. Importar proyecto

### Paso 3: Configurar build
- Framework: Other
- Build Command: `npm run build`
- Output Directory: `build/client`
- Node Version: 20.x

### Paso 4: Agregar variables de entorno en Vercel
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- `VITE_META_PIXEL_ID` (lo agregarás después)

### Paso 5: Deploy
- Push a GitHub
- Vercel hace deploy automático

---

## 📊 Fase 3: Meta Pixel

### Paso 1: Obtener Pixel ID
1. Ir a Facebook Business Manager
2. Events Manager → Pixels
3. Copiar tu Pixel ID

### Paso 2: Agregar código en root.tsx
Insertar script de Meta Pixel en el `<head>`

### Paso 3: Configurar variable de entorno
Agregar `VITE_META_PIXEL_ID` en:
- `.env` local
- Variables de entorno en Vercel

### Paso 4: Testing
- Instalar Meta Pixel Helper (extensión Chrome)
- Verificar que el pixel dispara correctamente

---

## ⏱️ Timeline Sugerido

### Opción Rápida (1 semana)
- **Día 1-2:** Crear páginas estáticas + setup Sanity
- **Día 3-4:** Integrar portafolio con Sanity
- **Día 5:** Deploy a Vercel + Meta Pixel
- **Día 6-7:** Testing y ajustes

### Opción Detallada (2 semanas)
- **Semana 1:** Todo Sanity + componentes
- **Semana 2:** Deploy + tracking + optimización

---

## ✅ Checklist

### Sanity
- [ ] Crear cuenta en sanity.io
- [ ] Instalar dependencias
- [ ] Crear schema de proyectos
- [ ] Configurar Sanity Studio
- [ ] Integrar en frontend
- [ ] Poblar proyectos iniciales

### Vercel
- [ ] Crear cuenta en Vercel
- [ ] Conectar GitHub
- [ ] Configurar variables de entorno
- [ ] Primer deploy exitoso

### Meta Pixel
- [ ] Obtener Pixel ID
- [ ] Agregar código en root.tsx
- [ ] Configurar variable de entorno
- [ ] Verificar con Pixel Helper

---

## 💡 Ventajas de este Approach

✅ Solo el portafolio es editable (más simple)  
✅ Páginas estáticas son más rápidas  
✅ Menor costo (plan Free de Sanity suficiente)  
✅ Menos complejidad = menos problemas  
✅ Fácil agregar/editar proyectos sin tocar código  
✅ Deploy automático con cada push  

---

## 📚 Recursos

- [Sanity Docs](https://www.sanity.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Meta Pixel Setup](https://www.facebook.com/business/help/952192354843755)

---

**Última actualización:** Noviembre 21, 2024  
**Proyecto:** By Fernanda Tovar Portfolio
