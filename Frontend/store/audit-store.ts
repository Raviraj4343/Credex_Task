"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuditFormValues, AuditToolFormValue } from "@/types/audit";

const defaultTool = (): AuditToolFormValue => ({
  toolKey: "chatgpt",
  planKey: "plus",
  monthlySpend: 20,
  seats: 1,
  primaryUseCase: "Content, research, and team productivity"
});

const initialState: AuditFormValues = {
  teamName: "",
  teamSize: 8,
  tools: [defaultTool()]
};

type AuditStore = {
  values: AuditFormValues;
  update: (partial: Partial<AuditFormValues>) => void;
  setTools: (tools: AuditToolFormValue[]) => void;
  reset: () => void;
};

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      values: initialState,
      update: (partial) =>
        set((state) => ({
          values: {
            ...state.values,
            ...partial
          }
        })),
      setTools: (tools) =>
        set((state) => ({
          values: {
            ...state.values,
            tools
          }
        })),
      reset: () => set({ values: initialState })
    }),
    {
      name: "ai-spend-audit-form"
    }
  )
);
