import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
type ConfigType = Record<string, any>;
interface ModelStore<C = ConfigType> {
  config?: C;
  setConfig: (config: C) => void;
}
export const useModelStore = create<ModelStore>()(
  devtools(
    persist(
      immer((set) => ({
        config: undefined,
        setConfig: (config) => set((state) => ({ config })),
      })),
      { name: "model-storage" }
    ), {
    name: "model-store",
  })
);
