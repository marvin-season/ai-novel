import { NavLink, Outlet } from "react-router-dom";
import { toast } from "sonner";

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
        <div onClick={() => {
          toast.success('别点我')
        }} className="navbar-brand text-blue-600 cursor-pointer">
          叽里咕噜
        </div>
        {/* <NavLink to={"logger"} className="navbar-brand">
          日志
        </NavLink>
        <NavLink to={"pdf-to-txt"} className="navbar-brand">
          PDF2TXT
        </NavLink> */}
      </nav>
      <div className={`h-[calc(100dvh-60px)]`}>
        <Outlet />
      </div>
    </div>
  );
}
