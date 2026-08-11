"use client";

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import {
  INITIAL_BUDGETS,
  INITIAL_CLIENTS,
  INITIAL_PRODUCTIONS,
  INITIAL_REMINDERS,
} from "@/lib/mock-data";
import type { Budget, BudgetStatus, Client, Note, PipelineStage, Production, Reminder } from "@/lib/types";

interface DemoDataState {
  clients: Client[];
  productions: Production[];
  budgets: Budget[];
  reminders: Reminder[];
}

type Action =
  | { type: "MOVE_PRODUCTION_STAGE"; productionId: string; stage: PipelineStage }
  | { type: "SET_BUDGET_STATUS"; budgetId: string; status: BudgetStatus }
  | { type: "TOGGLE_REMINDER"; reminderId: string }
  | { type: "ADD_NOTE"; clientId: string; note: Note }
  | { type: "ADD_BUDGET"; budget: Budget };

const initialState: DemoDataState = {
  clients: INITIAL_CLIENTS,
  productions: INITIAL_PRODUCTIONS,
  budgets: INITIAL_BUDGETS,
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
    case "ADD_NOTE":
      return {
        ...state,
        clients: state.clients.map((c) =>
          c.id === action.clientId ? { ...c, notes: [action.note, ...c.notes] } : c,
        ),
      };
    case "ADD_BUDGET":
      return { ...state, budgets: [action.budget, ...state.budgets] };
    default:
      return state;
  }
}

interface DemoDataContextValue extends DemoDataState {
  moveProductionStage: (productionId: string, stage: PipelineStage) => void;
  approveBudget: (budgetId: string) => void;
  rejectBudget: (budgetId: string) => void;
  toggleReminder: (reminderId: string) => void;
  addNote: (clientId: string, text: string) => void;
  addBudget: (budget: Budget) => void;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoDataReducer, initialState);

  const value = useMemo<DemoDataContextValue>(
    () => ({
      ...state,
      moveProductionStage: (productionId, stage) =>
        dispatch({ type: "MOVE_PRODUCTION_STAGE", productionId, stage }),
      approveBudget: (budgetId) =>
        dispatch({ type: "SET_BUDGET_STATUS", budgetId, status: "aprobado" }),
      rejectBudget: (budgetId) =>
        dispatch({ type: "SET_BUDGET_STATUS", budgetId, status: "vencido" }),
      toggleReminder: (reminderId) => dispatch({ type: "TOGGLE_REMINDER", reminderId }),
      addNote: (clientId, text) =>
        dispatch({
          type: "ADD_NOTE",
          clientId,
          note: { id: `note-${Date.now()}`, date: new Date().toISOString().slice(0, 10), text },
        }),
      addBudget: (budget) => dispatch({ type: "ADD_BUDGET", budget }),
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
