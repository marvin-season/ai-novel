# pnpm build
#!/bin/bash

# 服务器信息
SERVER="root@fuelstack.icu"
TARGET_DIR="/root/projects/ai-novel"

# 检查远程目录是否存在，如果不存在则创建
ssh $SERVER "mkdir -p $TARGET_DIR"

# 生成带时间戳的 zip 文件名
TIMESTAMP=$(date +%Y%m%d%H%M%S)
ZIP_FILE="dist_${TIMESTAMP}.zip"

# 压缩本地的 dist 目录
echo "压缩本地的 dist 目录为 $ZIP_FILE..."
# zip -r $ZIP_FILE ./dist 
# 使用 -x 选项排除不必要的文件：
zip -r $ZIP_FILE ./dist -x "*/__MACOSX*" "*/.DS_Store"

# 上传 zip 文件到服务器
echo "上传 $ZIP_FILE 到服务器..."
scp $ZIP_FILE $SERVER:$TARGET_DIR/
scp docker-compose.yml $SERVER:$TARGET_DIR/
scp nginx.conf $SERVER:$TARGET_DIR/

# 在服务器上解压并替换 dist 目录
echo "在服务器上解压并替换 dist 目录..."
ssh $SERVER "
  cd $TARGET_DIR && \
  rm -rf dist && \
  unzip -o $ZIP_FILE -d $TARGET_DIR && \
  docker restart nginx_ai_novel
"

# 删除本地的 zip 文件
echo "清理本地的 $ZIP_FILE..."
rm $ZIP_FILE

echo "部署完成！"