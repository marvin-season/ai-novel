import useStore from "@/store";
import { useEffect } from "react";

export default function Logger() {
  const { count, increment, loadFromIDB } = useStore();


  // 加载初始状态
  useEffect(() => {
    loadFromIDB();
  }, [loadFromIDB]);
  return (
    <div>
      {count}
      <button
        onClick={() => {
          increment()
        }}
      >
        increment
      </button>
    </div>
  );
}
