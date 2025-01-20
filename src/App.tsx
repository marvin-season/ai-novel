import { Index } from "@/pages/index";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Index />} />
          <Route path="logger" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
