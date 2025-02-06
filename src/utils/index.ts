import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// 解析 PDF
export async function* pdfTextGenerator(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;
  const pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);

  for (const i of pages) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const str = textContent.items
      .map((item: any) => {
        if (item.hasEOL) {
          //
          return item.str + '\n';
        }
        return item.str;
      })
      .join('');

    yield str;
  }
}

// 下载 TXT 文件
export const handleDownloadText = (text: string) => {
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'converted.txt';
  link.click();
};
