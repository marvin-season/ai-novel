import { configureStore } from "@reduxjs/toolkit";
import novelReducer from "@/store/slice/NoveSlice.ts";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    novel: novelReducer,
  },
});
export default store

// 自动推断 RootState 类型
export type RootState = ReturnType<typeof store.getState>;

// 创建类型化的 useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;