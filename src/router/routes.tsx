import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/loading";


const NovelPage = lazy(() => import("@/pages/dashboard/novel"));
const Logger = lazy(() => import("@/pages/dashboard/logger"));

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <NovelPage />
          </Suspense>
        ),
      },
      {
        path: "logger",
        element: (
          <Suspense fallback={<Loading />}>
            <Logger />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
