import { NavLink, Outlet } from "react-router-dom";
import { BookOpenText, Menu, PencilLineIcon, ShieldCloseIcon, XIcon } from "lucide-react";
import Navbar from "./components/navbar";
import Dropdown from "./components/dropdown";

export default function Dashboard() {
  return (
    <div className={"h-[100dvh]"}>
      <div className="fixed right-2 top-2 z-10 p-2">
        <Dropdown>
          <Navbar />
        </Dropdown>
      </div>

      <div className={`h-dvh`}>
        <Outlet />
      </div>
    </div>
  );
}
