import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/loading";

const NovelPage = lazy(() => import("@/pages/dashboard/novel"));

const Setting = lazy(() => import("@/pages/dashboard/setting"));

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Dashboard,
    ErrorBoundary: () => <div>error</div>,
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
        path: "setting",
        element: (
          <Suspense fallback={<Loading />}>
            <Setting />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
