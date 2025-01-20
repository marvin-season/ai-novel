import { create } from "zustand";
import { openDB } from "idb";

// 创建 IDB 数据库
const dbPromise = openDB("app-store", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("zustand-store")) {
      db.createObjectStore("zustand-store");
    }
  },
});

// 定义 IDB 相关操作
const idbStorage = {
  async setItem(key: string, value: any) {
    const db = await dbPromise;
    return db.put("zustand-store", value, key);
  },
  async getItem(key: string) {
    const db = await dbPromise;
    return db.get("zustand-store", key);
  },
};

// Zustand 状态
interface AppState {
  count: number;
  increment: () => void;
  loadFromIDB: () => Promise<void>;
}

const useStore = create<AppState>((set, get) => ({
  count: 0,
  increment: async () => {
    const newCount = get().count + 1;
    set({ count: newCount });
    // 更新 IDB
    await idbStorage.setItem("count", newCount);
  },
  loadFromIDB: async () => {
    // 从 IDB 加载数据
    const savedCount = await idbStorage.getItem("count");
    if (savedCount !== undefined) {
      set({ count: savedCount });
    }
  },
}));

export default useStore;
