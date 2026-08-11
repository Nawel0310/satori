import type {
  Client,
  Production,
  Budget,
  Reminder,
  BudgetTemplate,
} from "./types";

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "cli-001",
    name: "Inmobiliaria Vista Sur",
    type: "inmobiliaria",
    contactName: "Marina Coló",
    contactEmail: "marina.colo@vistasur.com.ar",
    contactPhone: "+54 9 341 555-0142",
    lastContactDate: "2026-08-07",
    notes: [
      {
        id: "note-001",
        date: "2026-08-07",
        text: "Pidió cotizar toma aérea del edificio con luz de atardecer para el lanzamiento comercial.",
      },
      {
        id: "note-002",
        date: "2026-07-29",
        text: "Reunión inicial. Le interesa un paquete de drone + recorrido virtual para 3 desarrollos.",
      },
    ],
  },
  {
    id: "cli-002",
    name: "Constructora Río",
    type: "constructora",
    contactName: "Emiliano Suárez",
    contactEmail: "esuarez@constructorario.com",
    contactPhone: "+54 9 341 555-0198",
    lastContactDate: "2026-08-10",
    notes: [
      {
        id: "note-003",
        date: "2026-08-10",
        text: "Confirmó seguimiento mensual de obra en Torre Norte. Pide entrega los días 28 de cada mes.",
      },
      {
        id: "note-004",
        date: "2026-07-15",
        text: "Primer contacto por recomendación de Inmobiliaria Vista Sur.",
      },
    ],
  },
  {
    id: "cli-003",
    name: "Agencia BTL Norte",
    type: "agencia",
    contactName: "Julieta Fernández",
    contactEmail: "julieta@btlnorte.com.ar",
    contactPhone: "+54 9 11 4555-0177",
    lastContactDate: "2026-08-05",
    notes: [
      {
        id: "note-005",
        date: "2026-08-05",
        text: "Cobertura del evento corporativo de Banco Andes, necesitan entrega de highlights en 48hs.",
      },
    ],
  },
  {
    id: "cli-004",
    name: "Municipalidad de Rosario",
    type: "institucional",
    contactName: "Diego Paz",
    contactEmail: "dpaz@rosario.gob.ar",
    contactPhone: "+54 341 480-2000",
    lastContactDate: "2026-08-03",
    notes: [
      {
        id: "note-006",
        date: "2026-08-03",
        text: "Video institucional de turismo, 2 días de rodaje. Esperando aprobación de presupuesto.",
      },
      {
        id: "note-007",
        date: "2026-07-20",
        text: "Reunión con área de comunicación para definir guion.",
      },
    ],
  },
  {
    id: "cli-005",
    name: "Grupo Eventos Sur",
    type: "eventos",
    contactName: "Lucas Ibáñez",
    contactEmail: "lucas@gruposu.com.ar",
    contactPhone: "+54 9 341 555-0210",
    lastContactDate: "2026-07-31",
    notes: [
      {
        id: "note-008",
        date: "2026-07-31",
        text: "Cerraron cobertura completa de Expo Rosario 2026, 3 jornadas.",
      },
    ],
  },
  {
    id: "cli-006",
    name: "Desarrollos Costanera",
    type: "inmobiliaria",
    contactName: "Rocío Méndez",
    contactEmail: "rmendez@costanera-dev.com",
    contactPhone: "+54 9 341 555-0233",
    lastContactDate: "2026-07-18",
    notes: [
      {
        id: "note-009",
        date: "2026-07-18",
        text: "Presupuesto vencido sin respuesta. Reintentar contacto la próxima semana.",
      },
    ],
  },
];

export const INITIAL_PRODUCTIONS: Production[] = [
  {
    id: "prod-001",
    clientId: "cli-001",
    title: "Video drone lanzamiento",
    category: "drone",
    stage: "propuesta",
    startDate: "2026-08-20",
  },
  {
    id: "prod-002",
    clientId: "cli-002",
    title: "Seguimiento mensual de obra — Torre Norte",
    category: "obra",
    stage: "ganado",
    startDate: "2026-08-28",
  },
  {
    id: "prod-003",
    clientId: "cli-003",
    title: "Evento corporativo Banco Andes",
    category: "evento",
    stage: "contacto",
    startDate: "2026-09-02",
  },
  {
    id: "prod-004",
    clientId: "cli-004",
    title: "Video institucional de turismo",
    category: "institucional",
    stage: "propuesta",
    startDate: "2026-09-10",
  },
  {
    id: "prod-005",
    clientId: "cli-005",
    title: "Cobertura Expo Rosario 2026",
    category: "evento",
    stage: "ganado",
    startDate: "2026-09-15",
  },
  {
    id: "prod-006",
    clientId: "cli-006",
    title: "Drone + recorrido virtual",
    category: "drone",
    stage: "perdido",
  },
];

export const INITIAL_BUDGETS: Budget[] = [
  {
    id: "PRE-2026-0001",
    clientId: "cli-002",
    productionId: "prod-002",
    title: "Seguimiento mensual de obra — Torre Norte",
    date: "2026-08-01",
    status: "aprobado",
    lineItems: [
      { id: "li-001", description: "Día de rodaje mensual con dron", quantity: 1, unitPrice: 150000 },
      { id: "li-002", description: "Edición y entrega mensual", quantity: 1, unitPrice: 90000 },
    ],
  },
  {
    id: "PRE-2026-0002",
    clientId: "cli-004",
    productionId: "prod-004",
    title: "Video institucional 2 días de rodaje + dron + edición",
    date: "2026-08-03",
    status: "visto",
    lineItems: [
      { id: "li-003", description: "Día de rodaje — equipo completo", quantity: 2, unitPrice: 180000 },
      { id: "li-004", description: "Operador de drone + equipo", quantity: 1, unitPrice: 150000 },
      { id: "li-005", description: "Edición y montaje", quantity: 1, unitPrice: 220000 },
      { id: "li-006", description: "Locución profesional", quantity: 1, unitPrice: 60000 },
      { id: "li-007", description: "Motion graphics / titulación", quantity: 1, unitPrice: 90000 },
    ],
  },
  {
    id: "PRE-2026-0003",
    clientId: "cli-003",
    productionId: "prod-003",
    title: "Cobertura audiovisual — Evento Banco Andes",
    date: "2026-08-05",
    status: "enviado",
    lineItems: [
      { id: "li-008", description: "Cobertura fotográfica del evento", quantity: 1, unitPrice: 110000 },
      { id: "li-009", description: "Cobertura de video + highlights 48hs", quantity: 1, unitPrice: 160000 },
      { id: "li-010", description: "Edición de reel para redes", quantity: 1, unitPrice: 70000 },
    ],
  },
  {
    id: "PRE-2026-0004",
    clientId: "cli-006",
    productionId: "prod-006",
    title: "Drone + recorrido virtual",
    date: "2026-07-10",
    status: "vencido",
    lineItems: [
      { id: "li-011", description: "Día de rodaje con dron", quantity: 1, unitPrice: 150000 },
      { id: "li-012", description: "Recorrido virtual 360°", quantity: 1, unitPrice: 130000 },
    ],
  },
];

export const INITIAL_REMINDERS: Reminder[] = [
  {
    id: "rem-001",
    clientId: "cli-002",
    text: "Llamar a Constructora Río",
    dueDate: "2026-08-11",
    done: false,
  },
  {
    id: "rem-002",
    clientId: "cli-001",
    text: "Enviar propuesta actualizada de video drone",
    dueDate: "2026-08-12",
    done: false,
  },
  {
    id: "rem-003",
    clientId: "cli-003",
    text: "Confirmar fecha de rodaje — evento Banco Andes",
    dueDate: "2026-08-13",
    done: false,
  },
  {
    id: "rem-004",
    clientId: "cli-004",
    text: "Seguimiento de presupuesto institucional",
    dueDate: "2026-08-09",
    done: true,
  },
];

export const BUDGET_TEMPLATES: BudgetTemplate[] = [
  {
    id: "tpl-001",
    name: "Video institucional 2 días + dron + edición",
    lineItems: [
      { description: "Día de rodaje — equipo completo", quantity: 2, unitPrice: 180000 },
      { description: "Operador de drone + equipo", quantity: 1, unitPrice: 150000 },
      { description: "Edición y montaje", quantity: 1, unitPrice: 220000 },
      { description: "Locución profesional", quantity: 1, unitPrice: 60000 },
      { description: "Motion graphics / titulación", quantity: 1, unitPrice: 90000 },
    ],
  },
  {
    id: "tpl-002",
    name: "Seguimiento mensual de obra",
    lineItems: [
      { description: "Día de rodaje mensual con dron", quantity: 1, unitPrice: 150000 },
      { description: "Edición y entrega mensual", quantity: 1, unitPrice: 90000 },
    ],
  },
  {
    id: "tpl-003",
    name: "Cobertura de evento corporativo",
    lineItems: [
      { description: "Cobertura fotográfica del evento", quantity: 1, unitPrice: 110000 },
      { description: "Cobertura de video + highlights 48hs", quantity: 1, unitPrice: 160000 },
      { description: "Edición de reel para redes", quantity: 1, unitPrice: 70000 },
    ],
  },
];

let budgetNumberSeq = INITIAL_BUDGETS.length + 1;

export function nextBudgetId(): string {
  const year = new Date().getFullYear();
  const id = `PRE-${year}-${String(budgetNumberSeq).padStart(4, "0")}`;
  budgetNumberSeq += 1;
  return id;
}
