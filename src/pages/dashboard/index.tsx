import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-dvh">
      <nav
        className={
          "h-full w-[100px] navbar bg-white shadow-lg py-6 flex flex-col items-center gap-4 font-bold border-r"
        }
      >
        <NavLink to={"/"} className="navbar-brand">
          首页
        </NavLink>
        <NavLink to={"logger"} className="navbar-brand">
          日志
        </NavLink>
        <NavLink to={"reading"} className="navbar-brand">
          Reading
        </NavLink>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
