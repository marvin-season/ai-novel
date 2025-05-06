import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Toaster as ToasterSonner } from "sonner";

function App() {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "公告：",
      description: "本站点的数据均存储在您的客户端，不会窃取您的数据",
    });
  }, []);
  return (
    <>
      <Toaster />
      <ToasterSonner />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
