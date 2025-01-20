import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand">index</span>
        <span className="navbar-brand">logger</span>
      </nav>
      <Outlet />
    </>
  );
}
