import { NavLink, Outlet } from "react-router-dom";
import { toast } from "sonner";
import ModelSetting from "@/components/setting";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh]"}>
      <nav
        className={
          "navbar h-[60px] sticky top-0 bg-white shadow-lg backdrop-blur px-6 flex justify-between font-bold text-lg border border-muted"
        }
      >
        <div className="flex items-center gap-4 ">
          <NavLink to={"/"} className="navbar-brand">
            首页
          </NavLink>
          <NavLink to={"reading"} className="navbar-brand">
            Reading
          </NavLink>
        </div>
        <ModelSetting />
      </nav>
      <div className={`h-[calc(100dvh-60px)]`}>
        <Outlet />
      </div>
    </div>
  );
}
