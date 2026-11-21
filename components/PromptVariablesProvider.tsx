'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { PromptValues } from '@/lib/prompt-variables';

const storageKey = 'tfp_prompt_vars_v1';
const variables = createContext({ values: {} as PromptValues, setValue: (_key: string, _value: string) => {}, clear: () => {} });

export function usePromptVariables() {
  return useContext(variables);
}

export default function PromptVariablesProvider({ children }: { children: React.ReactNode }) {
  const [values, setValues] = useState<PromptValues>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? '{}');
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
        setValues(Object.fromEntries(Object.entries(saved)
          .filter(([key, value]) => /^[a-zA-Z0-9][a-zA-Z0-9_ :/-]{0,112}$/.test(key) && typeof value === 'string' && value.length <= 1000)));
      }
    } catch { /* The editor remains available without browser storage. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (Object.keys(values).length) sessionStorage.setItem(storageKey, JSON.stringify(values));
      else sessionStorage.removeItem(storageKey);
    } catch { /* Keep the active inputs available in memory. */ }
  }, [values, ready]);

  function setValue(key: string, value: string) {
    setValues(previous => {
      const next = { ...previous };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });
  }

  return <variables.Provider value={{ values, setValue, clear: () => setValues({}) }}>{children}</variables.Provider>;
}
