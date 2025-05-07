import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "sonner";
import MobileDetector from "@/components/mobile-warning/MobileDetector";

function App() {
  return (
    <>
      <MobileDetector>
        <Toaster />
        <ToasterSonner />
        <RouterProvider router={router}></RouterProvider>
      </MobileDetector>
    </>
  );
}

export default App;
