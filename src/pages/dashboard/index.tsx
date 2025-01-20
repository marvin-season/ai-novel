import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh]"}>
      <nav
        className={
          "navbar h-[60px] sticky top-0 bg-white shadow-lg backdrop-blur px-6 flex items-center gap-4 font-bold text-lg border border-muted"
        }
      >
        <NavLink to={"/"} className="navbar-brand">
          首页
        </NavLink>
        <NavLink to={"logger"} className="navbar-brand">
          日志
        </NavLink>
      </nav>
      <div className={`h-[calc(100dvh-60px)]`}>
        <Outlet />
      </div>
    </div>
  );
}
