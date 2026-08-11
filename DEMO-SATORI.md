# Demo mockeada para Satori (Productora Audiovisual)

Spec interna para diseñar la demo interactiva gratuita a mostrarle a **Satori** (productora de video/contenido: drone, seguimiento de obra civil, inmobiliarias, eventos, institucionales). No es desarrollo real — es la Bonificación #1 de la oferta: pantallas navegables, con datos de prueba, sin costo, para que Satori vea su problema resuelto antes de pagar nada.

## 1. Objetivo de la demo

De-riskear la venta. Satori tiene que **tocar** el sistema y ver sus dos problemas concretos ya resueltos en pantalla, sin comprometerse a nada:

- El presupuesto de producción armado a mano se pierde en un mail, sin saber si lo aprobaron.
- Maneja varios clientes y agencias con producciones en distintas etapas y no recuerda en qué quedó cada propuesta.

Si la demo convence, ahí se cotiza el desarrollo real (Bonificación #2 de `OFERTA REFINADA.docx`).

## 2. Alcance

**Es (esta etapa, gratis):**
- Navegación clickable entre pantallas.
- Datos mockeados/hardcodeados en el frontend (sin base de datos real).
- Interacciones simuladas (drag & drop del embudo, "aprobar presupuesto") sin persistencia real — el estado puede resetear al recargar, eso es aceptable.

**No es (queda para la fase paga, post-demo):**
- Login funcional con auth real.
- Base de datos / backend real.
- Envío de mail, notificaciones, pagos o integraciones de terceros.
- Reglas de negocio o validaciones reales de Satori.

Marcar esta línea es importante para que la demo no genere una expectativa que se vende después como parte del desarrollo real.

## 3. Mapa de pantallas

### 3.1 Login / acceso simple
- **Propósito:** transmitir que el sistema es privado y profesional, no una web pública.
- **UI:** pantalla simple con logo de Satori, campos usuario/contraseña, botón "Ingresar". Cualquier click/valor entra — no valida nada.
- **No incluir:** recuperar contraseña, registro, 2FA — ruido innecesario en un mock.

### 3.2 Dashboard / inicio
- **Propósito:** la pantalla que más "vende" de un vistazo — resume ambos problemas ya resueltos.
- **UI:** tarjetas resumen — producciones activas, presupuestos pendientes de aprobación, recordatorios de seguimiento del día. Accesos directos a CRM y Presupuestos.
- **Datos de prueba:** ej. "3 producciones en curso", "2 presupuestos esperando aprobación", "Recordatorio: llamar a Constructora Rio hoy".

### 3.3 CRM — listado de clientes/agencias
- **Propósito:** resuelve "no recuerda en qué quedó cada propuesta".
- **UI:** tabla o tarjetas con nombre de cliente/agencia, tipo de producción, etapa actual, último contacto. Buscador y filtros por etapa/tipo de cliente.
- **Datos de prueba** (rubro Satori): "Inmobiliaria Vista Sur — video drone lanzamiento", "Constructora Río — seguimiento mensual de obra", "Agencia BTL Norte — evento corporativo Banco Andes", "Municipalidad de Rosario — institucional".

### 3.4 CRM — ficha de cliente
- **Propósito:** toda la info de un cliente en un solo lugar, sin buscar en mails viejos.
- **UI:** datos de contacto, historial de interacciones y notas, producciones asociadas, presupuestos vinculados a ese cliente (con su estado).
- **Datos de prueba:** 2-3 notas de seguimiento con fecha, 1 producción activa, 1 presupuesto en estado "enviado".

### 3.5 CRM — embudo de estados (Kanban arrastrable)
- **Propósito:** el "ajá" visual del CRM — de un vistazo, en qué etapa está cada propuesta.
- **UI:** 4 columnas — Contacto, Propuesta, Ganado, Perdido — con tarjetas de producción movibles entre columnas (drag & drop simulado, sin guardar en backend).
- **Datos de prueba:** repartir las 4-5 producciones de ejemplo entre las columnas para que el tablero no se vea vacío.

### 3.6 CRM — recordatorios / tareas
- **Propósito:** que ningún cliente se pierda entre tantas producciones.
- **UI:** lista simple de tareas pendientes por cliente, con fecha y estado (pendiente/hecho).

### 3.7 Presupuestos — listado
- **Propósito:** resuelve "no sabe si lo aprobaron" — estado siempre visible, no perdido en un mail.
- **UI:** tabla de presupuestos con cliente, monto, fecha, y estado visual (Enviado / Visto / Aprobado / Vencido) con color por estado.

### 3.8 Presupuestos — constructor
- **Propósito:** armar el presupuesto en minutos en vez de a mano.
- **UI:** alta de ítems (equipo, días de rodaje, edición, etc.) con cantidad y precio unitario, total calculado automático, selector de plantilla reutilizable, numeración automática del presupuesto.
- **Datos de prueba:** un presupuesto tipo "Video institucional 2 días de rodaje + dron + edición" con 4-5 ítems.

### 3.9 Presupuestos — vista "como la ve el cliente"
- **Propósito:** cierra el círculo del problema — el cliente lo ve y lo aprueba online, en vez de un mail sin respuesta. Es el momento más fuerte de la demo.
- **UI:** documento de presupuesto prolijo (no editable), con botones "Aprobar" / "Rechazar" visibles. Al aprobar, el estado en el listado (3.7) cambia a "Aprobado" en vivo.

### 3.10 Navegación general
- **UI:** sidebar o menú fijo con accesos a Dashboard, CRM, Presupuestos — consistente en todas las pantallas, para que la demo se sienta como un sistema único y no pantallas sueltas.

## 4. Estilo visual sugerido

Estética acorde al rubro audiovisual de Satori: cinematográfico, tipografía fuerte, espacio para imágenes reales de drone/obra/eventos como datos de prueba (no un dashboard SaaS genérico celeste-y-blanco). Refuerza que el sistema fue pensado para *su* negocio, no una plantilla.

Basado en el Instagram real de Satori (`@satori.filmphoto`): perfil con fondo negro, wordmark "SATORI" blanco bold en tipografía condensada, subtítulo "FILM & PHOTO" con tracking amplio. El feed combina tomas aéreas de obra civil (grises de hormigón, tierra), metal industrial y luz cálida de eventos. Para la demo se invierte esa base — blanco dominante con negro como acento — manteniendo la misma tensión gráfica fuerte pero en clave clara y acromática, según lo pedido.

### Tipografía
- **Títulos:** fuente condensada/bold sans-serif de estilo cinematográfico — **Bebas Neue** o **Oswald** (fallback `sans-serif`). Ecoa el wordmark "SATORI" y los overlays de texto de sus videos.
- **Body/texto:** sans-serif neutra y legible — **Inter** o **Work Sans**. Da contraste limpio frente a los títulos condensados.

### Paleta de colores
Acromática por pedido explícito: blanco predominante, detalles en negro/grises, sin colores saturados. El color real lo aportan las imágenes/video de referencia (drone, obra civil, eventos), no la UI.

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#FFFFFF` (o `#FAFAFA`) | Fondo general, limpio |
| `--primary` | `#111113` | Wordmark, títulos, botones principales, estados fuertes ("Aprobado") |
| `--secondary` | `#6B6E73` | Texto secundario, bordes, tarjetas, estados neutros |
| `--accent` | `#2B2D30` | Hover states, elementos destacados sutiles |

## 5. Guión de recorrido de la demo (orden para mostrar en vivo)

1. **Login** → entra al sistema, transmite seriedad/privacidad.
2. **Dashboard** → panorama general en 5 segundos, "esto es lo que vas a ver todos los días".
3. **CRM listado + ficha de cliente** → "acá está cada cliente, con todo su historial" (resuelve problema 2).
4. **Embudo Kanban** → mover una tarjeta en vivo: "de un vistazo sabés en qué etapa está cada propuesta" (el "ajá" del CRM).
5. **Presupuestos — constructor** → armar un ítem en vivo: "esto que hacías a mano, en minutos" (resuelve problema 1).
6. **Presupuestos — vista cliente + aprobar** → click en "Aprobar" y mostrar que el estado cambia en el listado: "se acabó el presupuesto perdido en un mail sin respuesta" (el "ajá" del generador, cierre fuerte).

## 6. Checklist final pre-demo

- [ ] Datos de prueba cargados en las 3-5 fichas de cliente y 2-3 presupuestos (nada vacío en pantalla).
- [ ] Flujo completo probado de punta a punta: Login → Dashboard → CRM → Embudo → Presupuesto → Aprobar.
- [ ] Drag & drop del embudo funciona sin romperse.
- [ ] Botón "Aprobar" en la vista cliente refleja el cambio de estado en el listado de presupuestos.
- [ ] Ninguna pantalla promete algo de la fase paga (sin login real, sin guardar datos reales, sin envío de mail real).
- [ ] Nombres de clientes de ejemplo coherentes con el rubro de Satori (inmobiliarias, obra civil, eventos, institucional).
