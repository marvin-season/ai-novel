import { create } from 'zustand'

interface ModelConfigStore {
  yourState : any;
  yourAction : (val : any) => void;
}
export const useModelConfigStore = create<ModelConfigStore>((set)=>({
  yourState : 'VALUE',
  yourAction : (val) => set( (state) => ({ yourState : state.yourState }) )
}))
