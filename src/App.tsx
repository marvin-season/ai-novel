import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Provider } from "react-redux";
import store from "@/store";
console.log("app")
function App() {
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
