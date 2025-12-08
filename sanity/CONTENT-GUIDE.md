## Guía rápida para gestionar fotos del portafolio en Sanity

Esta guía explica cómo se puede **agregar, quitar y reordenar fotos** de las categorías:

- Weddings  
- Couples  
- Portraits  
- Moments  

El sitio ya está conectado a Sanity, así que **cualquier cambio publicado en el Studio se verá en la web** (puede tardar unos segundos).

---

## 1. Acceder al Sanity Studio

1. Abre el navegador y ve a la URL del Studio (ejemplo):  
   `https://byfernandatovar.sanity.studio/`
2. Inicia sesión con tu cuenta de Sanity / Google / GitHub (según lo que se configuró).

---

## 2. Entender la estructura

En el menú principal del Studio verás un tipo de documento llamado:

- **Portfolio Category**

Cada documento de este tipo representa una categoría del portafolio:

- `Weddings`
- `Couples`
- `Portraits`
- `Moments`

> **Importante:** No crees más tipos de documento; solo usa y edita estas 4 categorías.

---

## 3. Editar una categoría existente

1. En la barra lateral, haz clic en **Portfolio Category**.
2. Verás una lista de documentos. Abre uno, por ejemplo:
   - `Weddings (weddings)`
3. Dentro del documento verás estos campos:
   - **Slug / Name**: identificador interno (ej: `weddings`)  
     - **No lo cambies**. Si lo cambias, la página puede dejar de mostrar imágenes.
   - **Title**: título que aparece en la página (ej: `Weddings`)  
   - **Subtitle**: subtítulo que aparece arriba del título (ej: `Eternal Moments`)
   - **Images**: lista de todas las fotos de esa categoría

Puedes cambiar **Title** y **Subtitle** si lo necesitas; la estructura de la página se mantiene igual.

---

## 4. Subir nuevas fotos

Dentro de una categoría (ej. `Weddings`):

1. Ve al campo **Images**.
2. Haz clic en **“Add item”** o en el área de subida.
3. Arrastra tus imágenes o haz clic para seleccionarlas desde tu computadora.
4. Espera a que terminen de subir (verás una miniatura).
5. Opcional: haz clic en la imagen y completa el campo:
   - **Alt text / Texto alternativo**: una breve descripción (ej: `Pareja abrazándose al atardecer`).  
     Esto ayuda con accesibilidad y SEO.
6. Cuando termines, haz clic en **Publish** (publicar) arriba a la derecha.

> Las nuevas fotos aparecerán automáticamente en la web, manteniendo el mismo diseño (masonry/grid + lightbox).

---

## 5. Quitar fotos

1. Dentro de la categoría, en el listado de **Images**:
   - Localiza la foto que quieras quitar.
2. Haz clic en el icono de **papelera** o en el menú de opciones y selecciona **Delete / Remove**.
3. Revisa que las fotos que quieres mantener sigan ahí.
4. Haz clic en **Publish** para guardar los cambios.

> Si solo quitas una foto, la galería se reacomoda sola. No rompe el diseño.

---

## 6. Reordenar fotos

El orden de las fotos en Sanity es el mismo que en la web.

1. En el campo **Images**, coloca el mouse sobre la izquierda de una imagen.
2. Haz clic y **arrastra** la imagen hacia arriba o hacia abajo para cambiarla de posición.
3. Suelta cuando esté en el lugar deseado.
4. Haz clic en **Publish**.

> Esto te permite controlar qué fotos se ven primero sin tocar el código.

---

## 7. Recomendaciones de imágenes

- **Formato:** `.jpg` o `.webp` (webp es ideal para web).
- **Tamaño recomendado:** al menos 1600 px de ancho (para que se vean bien en pantallas grandes).
- **Peso:** intenta que cada imagen pese menos de 1 MB para que la web cargue rápido.
- **Consistencia:** usa un estilo visual consistente (tono, color, encuadre) para mantener la estética del portafolio.

---

## 8. ¿Qué NO tocar?

Para evitar romper la integración:

- No cambies el **slug / name** de las 4 categorías principales:
  - `weddings`
  - `couples`
  - `portraits`
  - `moments`
- No borres estos documentos. Si no quieres mostrar fotos en una categoría, simplemente deja la lista de **Images** vacía.

---

## 9. Resumen rápido para el cliente

1. Entra a la URL del Studio.
2. Abre **Portfolio Category**.
3. Elige la categoría (Weddings, Couples, Portraits, Moments).
4. En **Images**:
   - **Agregar**: sube nuevas fotos.
   - **Quitar**: borra las que ya no quieras mostrar.
   - **Reordenar**: arrastra para cambiar el orden.
5. Haz clic en **Publish**.
6. Actualiza la web para ver los cambios.

Con estos pasos, el portafolio es completamente autogestionable sin tocar código.


