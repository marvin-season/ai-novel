import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { useEventListener } from "ahooks/es";
import { Provider } from "react-redux";
import store from "@/store";

function App() {
  // useEventListener('beforeunload', (event) => {
  //   console.log("beforeunload");
  //   event.preventDefault();
  //   return 'please save your data';
  // })
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
