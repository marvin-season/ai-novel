import { NavLink, Outlet } from "react-router-dom";
import ModelSetting from "@/components/setting";
import { BookOpenText, PencilLineIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh]"}>
      <nav
        className={
          "navbar h-[60px] bg-white px-6 flex justify-between border-b"
        }
      >
        <div className="flex items-center gap-8">
          <NavLink to={"/"} className="navbar-brand">
            <PencilLineIcon size={20} />
          </NavLink>
          <NavLink to={"reading"} className="navbar-brand">
            <BookOpenText size={20}/>
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
