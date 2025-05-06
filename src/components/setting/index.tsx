import ModelSettings from "./model-settings";
import { providers } from "@/constants/seed";
import { useMemo } from "react";

const ModelConfigPanel = () => {
  const currentProvider = useMemo(() => {
    const modelConfig = JSON.parse(
      localStorage.getItem("model-config") || "{}",
    );
    return modelConfig.id ? modelConfig : providers[0];
  }, [providers]);
  return (
    <div className="p-6">
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
    </div>
  );
};

export default ModelConfigPanel;
