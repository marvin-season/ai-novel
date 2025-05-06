import { Outlet, useLocation, useOutlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { CSSTransition, SwitchTransition } from "react-transition-group";
export default function Dashboard() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  return (
    <div className={"h-[100dvh] flex"}>
      {/* <FloatHandle /> */}
      <Navbar />

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          appear={true}
          timeout={300}
          classNames="page"
          unmountOnExit>
          <div className="flex-1">{currentOutlet}</div>
        </CSSTransition>
      </SwitchTransition>

    </div>
  );
}
