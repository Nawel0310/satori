export type PipelineStage = "contacto" | "propuesta" | "ganado" | "perdido";

export type ClientType =
  | "inmobiliaria"
  | "constructora"
  | "agencia"
  | "institucional"
  | "eventos";

export type BudgetStatus = "en_espera" | "enviado" | "visto" | "aprobado" | "vencido";

export type ProductionCategory = "drone" | "obra" | "evento" | "institucional";

export interface Note {
  id: string;
  date: string;
  text: string;
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  lastContactDate: string;
  logoUrl?: string;
  notes: Note[];
}

export interface Production {
  id: string;
  clientId: string;
  title: string;
  category: ProductionCategory;
  stage: PipelineStage;
  startDate?: string;
}

export interface BudgetLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Budget {
  id: string;
  clientId: string;
  productionId?: string;
  title: string;
  date: string;
  status: BudgetStatus;
  emailSentAt?: string;
  lineItems: BudgetLineItem[];
}

export interface Reminder {
  id: string;
  clientId: string;
  text: string;
  dueDate: string;
  done: boolean;
}

export interface BudgetTemplate {
  id: string;
  name: string;
  lineItems: Omit<BudgetLineItem, "id">[];
}
