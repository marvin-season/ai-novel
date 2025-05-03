import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh]"}>
      <div className={`h-dvh`}>
        <Outlet />
      </div>
    </div>
  );
}
