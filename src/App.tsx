import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from "@/router";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
