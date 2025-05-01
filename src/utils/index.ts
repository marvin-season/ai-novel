

// 下载 TXT 文件
export const handleDownloadText = (text: string) => {
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'converted.txt';
  link.click();
};
