import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/loading";

const NovelPage = lazy(() => import("@/pages/dashboard/novel"));

const Recoder = lazy(() => import("@/pages/dashboard/recoder"))


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
        path: 'recoder',
        element: (
          <Suspense fallback={<Loading />}>
            <Recoder />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
