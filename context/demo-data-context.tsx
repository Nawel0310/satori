"use client";

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import {
  INITIAL_BUDGETS,
  INITIAL_BUDGET_TEMPLATES,
  INITIAL_CLIENTS,
  INITIAL_PRODUCTIONS,
  INITIAL_REMINDERS,
} from "@/lib/mock-data";
import type {
  Budget,
  BudgetStatus,
  BudgetTemplate,
  Client,
  Note,
  PipelineStage,
  Production,
  Reminder,
} from "@/lib/types";

interface DemoDataState {
  clients: Client[];
  productions: Production[];
  budgets: Budget[];
  budgetTemplates: BudgetTemplate[];
  reminders: Reminder[];
}

type Action =
  | { type: "MOVE_PRODUCTION_STAGE"; productionId: string; stage: PipelineStage }
  | { type: "SET_BUDGET_STATUS"; budgetId: string; status: BudgetStatus }
  | { type: "TOGGLE_REMINDER"; reminderId: string }
  | { type: "ADD_REMINDER"; reminder: Reminder }
  | { type: "UPDATE_REMINDER"; reminderId: string; patch: Partial<Omit<Reminder, "id">> }
  | { type: "DELETE_REMINDER"; reminderId: string }
  | { type: "ADD_NOTE"; clientId: string; note: Note }
  | { type: "ADD_BUDGET"; budget: Budget }
  | { type: "UPDATE_BUDGET"; budgetId: string; patch: Partial<Omit<Budget, "id">> }
  | { type: "DELETE_BUDGET"; budgetId: string }
  | { type: "ADD_CLIENT"; client: Client }
  | { type: "UPDATE_CLIENT"; clientId: string; patch: Partial<Omit<Client, "id" | "notes">> }
  | { type: "DELETE_CLIENT"; clientId: string }
  | { type: "ADD_PRODUCTION"; production: Production }
  | { type: "UPDATE_PRODUCTION"; productionId: string; patch: Partial<Omit<Production, "id">> }
  | { type: "DELETE_PRODUCTION"; productionId: string }
  | { type: "ADD_TEMPLATE"; template: BudgetTemplate }
  | { type: "UPDATE_TEMPLATE"; templateId: string; patch: Partial<Omit<BudgetTemplate, "id">> }
  | { type: "DELETE_TEMPLATE"; templateId: string };

const initialState: DemoDataState = {
  clients: INITIAL_CLIENTS,
  productions: INITIAL_PRODUCTIONS,
  budgets: INITIAL_BUDGETS,
  budgetTemplates: INITIAL_BUDGET_TEMPLATES,
  reminders: INITIAL_REMINDERS,
};

function demoDataReducer(state: DemoDataState, action: Action): DemoDataState {
  switch (action.type) {
    case "MOVE_PRODUCTION_STAGE":
      return {
        ...state,
        productions: state.productions.map((p) =>
          p.id === action.productionId ? { ...p, stage: action.stage } : p,
        ),
      };
    case "SET_BUDGET_STATUS":
      return {
        ...state,
        budgets: state.budgets.map((b) =>
          b.id === action.budgetId ? { ...b, status: action.status } : b,
        ),
      };
    case "TOGGLE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map((r) =>
          r.id === action.reminderId ? { ...r, done: !r.done } : r,
        ),
      };
    case "ADD_REMINDER":
      return { ...state, reminders: [action.reminder, ...state.reminders] };
    case "UPDATE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map((r) =>
          r.id === action.reminderId ? { ...r, ...action.patch } : r,
        ),
      };
    case "DELETE_REMINDER":
      return { ...state, reminders: state.reminders.filter((r) => r.id !== action.reminderId) };
    case "ADD_NOTE":
      return {
        ...state,
        clients: state.clients.map((c) =>
          c.id === action.clientId ? { ...c, notes: [action.note, ...c.notes] } : c,
        ),
      };
    case "ADD_BUDGET":
      return { ...state, budgets: [action.budget, ...state.budgets] };
    case "UPDATE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.map((b) => (b.id === action.budgetId ? { ...b, ...action.patch } : b)),
      };
    case "DELETE_BUDGET":
      return { ...state, budgets: state.budgets.filter((b) => b.id !== action.budgetId) };
    case "ADD_CLIENT":
      return { ...state, clients: [action.client, ...state.clients] };
    case "UPDATE_CLIENT":
      return {
        ...state,
        clients: state.clients.map((c) => (c.id === action.clientId ? { ...c, ...action.patch } : c)),
      };
    case "DELETE_CLIENT":
      return {
        ...state,
        clients: state.clients.filter((c) => c.id !== action.clientId),
        productions: state.productions.filter((p) => p.clientId !== action.clientId),
        budgets: state.budgets.filter((b) => b.clientId !== action.clientId),
        reminders: state.reminders.filter((r) => r.clientId !== action.clientId),
      };
    case "ADD_PRODUCTION":
      return { ...state, productions: [action.production, ...state.productions] };
    case "UPDATE_PRODUCTION":
      return {
        ...state,
        productions: state.productions.map((p) =>
          p.id === action.productionId ? { ...p, ...action.patch } : p,
        ),
      };
    case "DELETE_PRODUCTION":
      return {
        ...state,
        productions: state.productions.filter((p) => p.id !== action.productionId),
        budgets: state.budgets.map((b) =>
          b.productionId === action.productionId ? { ...b, productionId: undefined } : b,
        ),
      };
    case "ADD_TEMPLATE":
      return { ...state, budgetTemplates: [action.template, ...state.budgetTemplates] };
    case "UPDATE_TEMPLATE":
      return {
        ...state,
        budgetTemplates: state.budgetTemplates.map((t) =>
          t.id === action.templateId ? { ...t, ...action.patch } : t,
        ),
      };
    case "DELETE_TEMPLATE":
      return {
        ...state,
        budgetTemplates: state.budgetTemplates.filter((t) => t.id !== action.templateId),
      };
    default:
      return state;
  }
}

interface DemoDataContextValue extends DemoDataState {
  moveProductionStage: (productionId: string, stage: PipelineStage) => void;
  setBudgetStatus: (budgetId: string, status: BudgetStatus) => void;
  approveBudget: (budgetId: string) => void;
  rejectBudget: (budgetId: string) => void;
  toggleReminder: (reminderId: string) => void;
  addReminder: (input: Omit<Reminder, "id" | "done">) => string;
  updateReminder: (reminderId: string, patch: Partial<Omit<Reminder, "id">>) => void;
  deleteReminder: (reminderId: string) => void;
  addNote: (clientId: string, text: string) => void;
  addBudget: (budget: Budget) => void;
  updateBudget: (budgetId: string, patch: Partial<Omit<Budget, "id">>) => void;
  deleteBudget: (budgetId: string) => void;
  addClient: (input: Omit<Client, "id" | "notes">) => string;
  updateClient: (clientId: string, patch: Partial<Omit<Client, "id" | "notes">>) => void;
  deleteClient: (clientId: string) => void;
  addProduction: (input: Omit<Production, "id">) => string;
  updateProduction: (productionId: string, patch: Partial<Omit<Production, "id">>) => void;
  deleteProduction: (productionId: string) => void;
  addTemplate: (input: Omit<BudgetTemplate, "id">) => string;
  updateTemplate: (templateId: string, patch: Partial<Omit<BudgetTemplate, "id">>) => void;
  deleteTemplate: (templateId: string) => void;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoDataReducer, initialState);

  const value = useMemo<DemoDataContextValue>(
    () => ({
      ...state,
      moveProductionStage: (productionId, stage) =>
        dispatch({ type: "MOVE_PRODUCTION_STAGE", productionId, stage }),
      setBudgetStatus: (budgetId, status) => dispatch({ type: "SET_BUDGET_STATUS", budgetId, status }),
      approveBudget: (budgetId) => dispatch({ type: "SET_BUDGET_STATUS", budgetId, status: "aprobado" }),
      rejectBudget: (budgetId) => dispatch({ type: "SET_BUDGET_STATUS", budgetId, status: "vencido" }),
      toggleReminder: (reminderId) => dispatch({ type: "TOGGLE_REMINDER", reminderId }),
      addReminder: (input) => {
        const id = `rem-${Date.now()}`;
        dispatch({ type: "ADD_REMINDER", reminder: { ...input, id, done: false } });
        return id;
      },
      updateReminder: (reminderId, patch) => dispatch({ type: "UPDATE_REMINDER", reminderId, patch }),
      deleteReminder: (reminderId) => dispatch({ type: "DELETE_REMINDER", reminderId }),
      addNote: (clientId, text) =>
        dispatch({
          type: "ADD_NOTE",
          clientId,
          note: { id: `note-${Date.now()}`, date: new Date().toISOString().slice(0, 10), text },
        }),
      addBudget: (budget) => dispatch({ type: "ADD_BUDGET", budget }),
      updateBudget: (budgetId, patch) => dispatch({ type: "UPDATE_BUDGET", budgetId, patch }),
      deleteBudget: (budgetId) => dispatch({ type: "DELETE_BUDGET", budgetId }),
      addClient: (input) => {
        const id = `cli-${Date.now()}`;
        dispatch({ type: "ADD_CLIENT", client: { ...input, id, notes: [] } });
        return id;
      },
      updateClient: (clientId, patch) => dispatch({ type: "UPDATE_CLIENT", clientId, patch }),
      deleteClient: (clientId) => dispatch({ type: "DELETE_CLIENT", clientId }),
      addProduction: (input) => {
        const id = `prod-${Date.now()}`;
        dispatch({ type: "ADD_PRODUCTION", production: { ...input, id } });
        return id;
      },
      updateProduction: (productionId, patch) => dispatch({ type: "UPDATE_PRODUCTION", productionId, patch }),
      deleteProduction: (productionId) => dispatch({ type: "DELETE_PRODUCTION", productionId }),
      addTemplate: (input) => {
        const id = `tpl-${Date.now()}`;
        dispatch({ type: "ADD_TEMPLATE", template: { ...input, id } });
        return id;
      },
      updateTemplate: (templateId, patch) => dispatch({ type: "UPDATE_TEMPLATE", templateId, patch }),
      deleteTemplate: (templateId) => dispatch({ type: "DELETE_TEMPLATE", templateId }),
    }),
    [state],
  );

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData(): DemoDataContextValue {
  const ctx = useContext(DemoDataContext);
  if (!ctx) {
    throw new Error("useDemoData must be used within a DemoDataProvider");
  }
  return ctx;
}
