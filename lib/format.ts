import type { BudgetLineItem, BudgetStatus, ClientType, PipelineStage, ProductionCategory } from "./types";

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
}

export function lineItemTotal(item: BudgetLineItem): number {
  return item.quantity * item.unitPrice;
}

export function budgetTotal(lineItems: BudgetLineItem[]): number {
  return lineItems.reduce((sum, item) => sum + lineItemTotal(item), 0);
}

export const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  inmobiliaria: "Inmobiliaria",
  constructora: "Constructora",
  agencia: "Agencia",
  institucional: "Institucional",
  eventos: "Eventos",
};

export const PIPELINE_STAGE_LABELS: Record<PipelineStage, string> = {
  propuesta: "Propuesta",
  aprobada: "Aprobada",
  en_produccion: "Producción",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

export const PRODUCTION_CATEGORY_LABELS: Record<ProductionCategory, string> = {
  drone: "Drone",
  obra: "Obra civil",
  evento: "Evento",
  institucional: "Institucional",
};

export const BUDGET_STATUS_LABELS: Record<BudgetStatus, string> = {
  en_espera: "En espera",
  enviado: "Enviado",
  visto: "Visto",
  aprobado: "Aprobado",
  vencido: "Vencido",
};
