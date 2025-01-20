export const providers = [
  {
    default: true,
    name: "ollama",
    id: "ollama",
    description: "ollama provider",
    dynamic_params: {
      base_url: {
        label: "base_url",
        type: "string",
        default: "http://127.0.0.1:11434",
        value: "http://127.0.0.1:11434",
        placeholder: "请输入base_url",
      },
      model: {
        label: "model",
        type: "select",
        default: "qwen2:7b",
        value: "qwen2:7b",
        placeholder: "请输入模型名称",
        options: [
          { name: "qwen2:7b", value: "qwen2:7b" },
          { name: "llama3.1", value: "llama3.1" },
        ],
      },
    },
  },
  {
    id: "azure",
    name: "azure",
    description: "azure provider",
    dynamic_params: {
      azure_openai_endpoint: {
        label: "azure_openai_endpoint",
        type: "string",
        default: "",
        value: "",
        placeholder: "请输入azure_openai_endpoint",
      },
      azure_openai_key: {
        label: "azure_openai_key",
        type: "string",
        default: "",
        value: "",
        placeholder: "请输入azure_openai_key",
      },
      open_model_pref: {
        label: "open_model_pref",
        type: "select",
        default: "",
        value: "",
        placeholder: "请输入部署的模型名称",
        options: [
          { name: "gpt-4", value: "gpt-4" },
          { name: "gpt-4o", value: "gpt-4o" },
        ],
      },
    },
  },
  {
    id: "deepseek",
    name: "deepseek",
    description: "deepseek provider",
    dynamic_params: {
      deepseek_baseurl: {
        label: "deepseek_baseurl",
        type: "string",
        default: "",
        value: "https://api.deepseek.com",
        placeholder: "请输入 deepseek_baseurl",
      },
      deepseek_api_key: {
        label: "deepseek_api_key",
        type: "string",
        default: "",
        value: "",
        placeholder: "请输入 deepseek_api_key",
      },
      deepseek_model_id: {
        label: "deepseek_model_id",
        type: "select",
        default: "",
        value: "deepseek-chat",
        placeholder: "请输入部署的模型名称",
        options: [{ name: "deepseek-chat", value: "deepseek-chat" }],
      },
    },
  },
];
