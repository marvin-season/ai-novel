import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className={'flex flex-col h-[100dvh]'}>
      <nav
        className={
          "navbar sticky top-0 bg-white shadow-lg backdrop-blur px-8 py-6 flex gap-4 font-bold text-lg border border-muted"
        }
      >
        <NavLink to={"/"} className="navbar-brand">
          首页
        </NavLink>
        <NavLink to={"logger"} className="navbar-brand">
          日志
        </NavLink>
      </nav>
      <div className={'flex-1'}>
        <Outlet />
      </div>
    </div>
  );
}
