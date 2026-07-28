# Sitio de nutrición

React + Vite + Supabase, pensado para deployar en Vercel.

## 1. Personalizar textos y contacto

Abrí `src/siteConfig.js` y completá:
- `nombre`, `titulo`, `bio`
- `fotoUrl` (poné la foto en la carpeta `public/` y referenciala como `/nombre-de-archivo.jpg`)
- `whatsappNumero` en formato internacional sin `+` ni espacios (ej. Argentina: `5491123456789`)
- `direccionConsultorio`

## 2. Crear el proyecto en Supabase

1. Andá a https://supabase.com → **New project**.
2. Cuando esté creado, entrá a **SQL Editor** → **New query**, pegá el contenido de `supabase/schema.sql` y ejecutalo. Esto crea las tablas `productos` y `turnos` con los permisos correctos (cualquiera puede ver los productos activos y enviar un turno, pero nadie externo puede leer los turnos de otras personas).
3. Andá a **Project Settings → API** y copiá:
   - `Project URL`
   - `anon public key`
4. Creá un archivo `.env` en la raíz del proyecto (podés copiar `.env.example`) y pegá esos valores:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

### Cargar los recetarios (productos)

En Supabase, andá a **Table editor → productos → Insert row** y completá:
- `nombre`, `descripcion`, `precio` (número, sin puntos ni comas)
- `imagen_url`: subí la imagen a **Storage** en Supabase (creá un bucket público, ej. `imagenes`) y pegá la URL pública, o usá cualquier link de imagen alojada.
- `link_pago`: ver paso 3.
- `activo`: `true`

Mientras no cargues productos reales, el sitio muestra 3 recetarios de ejemplo para que puedas ver cómo queda.

## 3. Generar los links de pago de Mercado Pago

No hace falta integrar la API de Mercado Pago para esto. Simplemente:
1. Entrá a tu cuenta de Mercado Pago → **Cobrar** → **Link de pago**.
2. Creá un link de pago para cada recetario, con su precio.
3. Pegá esa URL en el campo `link_pago` de cada producto en Supabase.

Cuando alguien hace clic en "Comprar", va directo a esa página de pago de Mercado Pago. Vos recibís el pago y le enviás el recetario por mail o WhatsApp (o, más adelante, podemos automatizar el envío con un webhook si te interesa).

## 4. Ver los turnos solicitados

Los turnos quedan guardados en la tabla `turnos` de Supabase (**Table editor → turnos**). Como además hay un botón directo a WhatsApp, muchas personas van a preferir escribir directamente ahí — el formulario queda como respaldo y como registro ordenado de solicitudes.

## 5. Correr el proyecto en tu máquina

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

## 6. Deployar en Vercel

1. Subí esta carpeta a un repositorio de GitHub.
2. En https://vercel.com → **Add New Project** → importá el repo.
3. Vercel detecta Vite automáticamente. Antes de deployar, andá a **Environment Variables** y agregá:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Vercel te da una URL pública (ej. `tu-sitio.vercel.app`), y podés conectar un dominio propio después desde **Settings → Domains**.

## Estructura del proyecto

```
src/
  siteConfig.js       ← datos editables (nombre, bio, whatsapp, etc.)
  App.jsx             ← ensambla las secciones
  styles.css          ← toda la identidad visual (paleta verde/blanco)
  components/
    Hero.jsx          ← portada con foto y descripción
    Tienda.jsx        ← recetarios traídos de Supabase
    Turnos.jsx        ← formulario de turnos + botón de WhatsApp
    Footer.jsx
    Divisor.jsx       ← detalle visual entre secciones
  lib/supabaseClient.js
supabase/schema.sql   ← script para crear las tablas
```
