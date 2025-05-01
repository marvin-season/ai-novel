import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/loading";
import Reading from "@/pages/dashboard/reading";


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
        path: 'reading',
        element: (
          <Suspense fallback={<Loading />}>
            <Reading />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
