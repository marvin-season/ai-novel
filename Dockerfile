FROM node:18-alpine AS base
# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json pnpm-lock.yaml ./
RUN npm config set registry https://registry.npmmirror.com \
&& npm i -g pnpm \
&& pnpm i \
# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露 Vite 开发服务器端口
EXPOSE 5173

# 启动开发服务器
CMD ["npm", "run", "dev"]