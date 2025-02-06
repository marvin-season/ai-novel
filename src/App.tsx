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
      
      title: "公告：",
      description: "本站点的数据均存储在您的客户端，不会窃取您的数据",
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
