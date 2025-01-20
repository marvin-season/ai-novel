import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { Index } from "@/pages/index";
import Logger from "@/pages/dashboard/logger";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'logger',
        element: <Logger />,
      },
    ],
    Component: Dashboard,
  },
];

export default routes;
