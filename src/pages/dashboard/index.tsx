import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={'/'} className="navbar-brand">首页</Link>
        <Link to={'logger'} className="navbar-brand">日志</Link>
      </nav>
      <Outlet />
    </>
  );
}
