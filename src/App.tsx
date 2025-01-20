import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { useEventListener } from "ahooks/es";

function App() {
  useEventListener('beforeunload', (event) => {
    console.log("beforeunload");
    event.preventDefault();
    return 'please save your data';
  })
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
