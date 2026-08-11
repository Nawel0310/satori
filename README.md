# Satori — Demo de sistema a medida

Demo interactiva mockeada para mostrarle a **Satori** (productora audiovisual: drone, seguimiento de obra civil, inmobiliarias, eventos, institucional) cómo sería su sistema de CRM + presupuestos a medida.

**Es 100% frontend, sin backend real.** No hay base de datos, no hay autenticación real, no se envían mails ni notificaciones. Todo el detalle de alcance está en `DEMO-SATORI.md`. Este README es la guía práctica para levantar y recorrer la demo.

## Requisitos

- Node.js 18 o superior.
- [pnpm](https://pnpm.io/) (el proyecto usa `pnpm-lock.yaml`).

## Cómo correr la demo

```bash
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000). Redirige automáticamente a `/login`.

## Cómo entrar

El login es falso: cualquier usuario y contraseña (incluso vacíos) entran al sistema. No hay recuperación de contraseña, registro ni 2FA — a propósito, están fuera de alcance de esta etapa.

## ⚠️ Importante: los datos no se guardan

Todos los clientes, producciones, presupuestos, plantillas y recordatorios viven en memoria del navegador (`context/demo-data-context.tsx`). Cualquier cosa que se cree, edite o borre durante la demo **se pierde al recargar la página** (F5) o cerrar la pestaña. Esto es el comportamiento esperado, no un bug — está documentado así en `DEMO-SATORI.md` §2. Si necesitás mostrar la demo varias veces seguidas, simplemente recargá antes de empezar de nuevo para volver a los datos de ejemplo originales.

## Mapa de pantallas

| Pantalla | Ruta |
|---|---|
| Login | `/login` |
| Dashboard | `/dashboard` |
| Gestión Clientes — listado | `/crm` |
| Gestión Clientes — ficha de cliente | `/crm/[id]` |
| Gestión Clientes — nuevo / editar cliente | `/crm/nuevo`, `/crm/[id]/editar` |
| Gestión Clientes — embudo (Kanban) | `/crm/embudo` |
| Gestión Clientes — producciones | `/crm/producciones` |
| Gestión Clientes — recordatorios | `/crm/recordatorios` |
| Presupuestos — listado | `/presupuestos` |
| Presupuestos — nuevo / editar | `/presupuestos/nuevo`, `/presupuestos/[id]/editar` |
| Presupuestos — vista del cliente (Aprobar/Rechazar) | `/presupuestos/[id]/cliente` |
| Presupuestos — plantillas | `/presupuestos/plantillas` |

La sidebar (o el menú hamburguesa en mobile/tablet) da acceso a todo — no hace falta escribir URLs a mano.

## Guión sugerido para mostrarle al cliente

1. **Login** → transmite que el sistema es privado y profesional.
2. **Dashboard** → panorama general en 5 segundos: producciones activas, presupuestos pendientes, recordatorios del día.
3. **Gestión Clientes → listado y ficha** → "acá está cada cliente, con todo su historial".
4. **Gestión Clientes → Embudo** → mover una tarjeta en vivo entre columnas (Contacto/Propuesta/Ganado/Perdido).
5. **Presupuestos → Nuevo** → armar un presupuesto en minutos usando una plantilla reutilizable.
6. **Presupuestos → Ver (vista cliente) → Aprobar** → mostrar que el estado cambia en vivo en el listado, sin recargar nada.

## Scripts disponibles

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm start    # levanta el build de producción
pnpm lint     # eslint
```

## Stack técnico

Next.js 16 (App Router) + TypeScript + React 19 + Tailwind CSS v4 (config CSS-first, sin `tailwind.config`) + pnpm. Sin dependencias adicionales de UI ni drag&drop — el Kanban usa la API nativa de HTML5 Drag and Drop.
