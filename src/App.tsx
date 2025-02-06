import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Toaster as ToasterSonner } from 'sonner'
console.log("app")
function App() {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    })
  }, [])
  return (
    <>
      <Toaster />
      <ToasterSonner/>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
