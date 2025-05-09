import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicForm } from "@/components/form";
import { useState } from "react";

export default function ModelSettings({
  providers,
  currentProvider: _currentProvider,
  onSave,
}: {
  providers: Record<string, any>[];
  currentProvider: Record<string, any>;
  onSave: (currentProvider: Record<string, any>) => Promise<void>;
}) {
  const [currentProvider, setCurrentProvider] = useState<any>(_currentProvider);

  return (
    <>
      {/* 模型设置 */}
      <div>
        <h3 className="text-lg mb-2 font-medium">{"模型设置"}</h3>
        <p className="text-sm mb-2 text-muted-foreground">{"选择模型提供商"}</p>
      </div>
      <Select
        value={currentProvider.id}
        onValueChange={(id) => {
          setCurrentProvider(providers.find((provider) => provider.id === id));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={"选择模型提供商"} />
        </SelectTrigger>
        <SelectContent>
          {providers.map((provider) => (
            <SelectItem key={provider.id} value={provider.id}>
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DynamicForm
        form={currentProvider.dynamic_params}
        onSubmit={async (values) => {
          await onSave({ ...currentProvider, dynamic_params: values });
        }}
      />
    </>
  );
}
