import { Outlet } from "react-router-dom";
import FloatHandle from "./novel/components/float-handle";
import Navbar from "./components/navbar";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh] flex"}>
      {/* <FloatHandle /> */}
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
