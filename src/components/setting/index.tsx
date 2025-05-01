import { Settings } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import ModelSettings from "./model-settings";
import { providers } from "@/constants/seed";
import { useMemo } from "react";
import { IconSize } from "@/constants";

export const ModelConfigPanel = () => {
  const currentProvider = useMemo(() => {
    const modelConfig = JSON.parse(
      localStorage.getItem("model-config") || "{}",
    );
    return modelConfig.id ? modelConfig : providers[0];
  }, [providers]);
  return (
    <>
      <ModelSettings
        providers={providers}
        currentProvider={currentProvider}
        onSave={async (config) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              localStorage.setItem("model-config", JSON.stringify(config));
              resolve();
            }, 500);
          });
        }}
      />
    </>
  );
};

export default function () {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="mr-1 text-sm text-blue-500 flex gap-2 items-center"> 
            <Settings size={IconSize}  />
            设置
          </div>
        </SheetTrigger>
        <SheetContent side={"top"}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <ModelConfigPanel />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
