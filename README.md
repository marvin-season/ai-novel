# AI Note

- **富文本笔记**
- **用户操作日志**
- **用户设置**
- **导出导入**
- **文件管理**

## Start

**dev**

```shell
pnpm i && pnpm run dev
```

**deploy ng**

```shell
docker-compose up -d
```

## Powered

Powered by [tiptap](https://tiptap.dev/)

Powered by [aisdk](https://sdk.vercel.ai/docs/introduction)

Powered by [shadcn](https://ui.shadcn.com/)

## 状态管理 + 数据管理

Zustand + IndexedDB

**设计思路：**
• 使用 Zustand 的 middleware（中间件）功能拦截状态更新。
• 使用 idb 将状态数据持久化到 IndexedDB。
• 应用初始化时从 IndexedDB 加载状态并恢复到 Zustand。

## 部署

使用nginx静态部署，借助于docker启动一个ng容器，将build后的静态资源推送到目标服务器，重启docker容器

## 喝杯咖啡 ☕️ ☀️

<!-- markdownlint-disable MD033 -->
<img src='./public/reward/alipay.png' width='250' alt=''/>
<!-- markdownlint-enable MD033 -->
