import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

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
          <Suspense fallback={<Loader2 />}>
            <NovelPage />
          </Suspense>
        ),
      },
      {
        path: "logger",
        element: (
          <Suspense fallback={<Loader2 />}>
            <Logger />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
