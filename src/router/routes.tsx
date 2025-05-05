import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/loading";
import Recoder from "@/pages/dashboard/recoder";


const NovelPage = lazy(() => import("@/pages/dashboard/novel"));


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
