import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/loading";


const NovelPage = lazy(() => import("@/pages/dashboard/novel"));
const Logger = lazy(() => import("@/pages/dashboard/logger"));
const PDF2TXT = lazy(() => import("@/pages/dashboard/pdf-to-txt"));
const Canvas = lazy(() => import("@/pages/dashboard/canvas"));

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
      {
        path: "canvas",
        element: (
          <Suspense fallback={<Loading />}>
            <Canvas />
          </Suspense>
        ),
      },
      {
        path: "pdf-to-txt",
        element: (
          <Suspense fallback={<Loading />}>
            <PDF2TXT />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
