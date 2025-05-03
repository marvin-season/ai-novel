import { Outlet } from "react-router-dom";
import FloatHandle from "./novel/components/float-handle";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh]"}>
      <FloatHandle />
      <Outlet />
    </div>
  );
}
