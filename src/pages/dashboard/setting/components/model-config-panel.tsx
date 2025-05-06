import ModelSettings from "./model-settings";
import { providers } from "@/constants/seed";
import { useModelStore } from "@/store/model";
import { useMemo } from "react";
import { toast } from "sonner";

const ModelConfigPanel = () => {
  const { config, setConfig } = useModelStore()
  const currentProvider = useMemo(() => {
    return config ? config : providers.find((provider) => provider.default) || providers[0];
  }, [config, providers]);
  return (
    <div className="p-6">
      <ModelSettings
        providers={providers}
        currentProvider={currentProvider}
        onSave={async (config) => {
          setConfig(config)
          toast.success("保存成功");
        }}
      />
    </div>
  );
};

export default ModelConfigPanel;
