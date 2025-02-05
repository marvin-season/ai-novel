import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();


export default function PDFtoTXT() {
  const [text, setText] = useState<string | null>(null);

  // 解析 PDF
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target?.result) return;
      const typedArray = new Uint8Array(e.target.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item: any) => item.str).join("\n") + "\n\n";
      }

      setText(extractedText);
    };
    reader.readAsArrayBuffer(file);
  };

  // 下载 TXT 文件
  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">PDF 转 TXT</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="mb-4 cursor-pointer border border-gray-300 p-2 rounded"
      />
      {text && (
        <>
          <textarea
            value={text}
            readOnly
            className="w-full max-w-2xl h-80 p-3 border rounded bg-white font-mono text-sm"
          />
          <button
            onClick={handleDownload}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            下载 TXT
          </button>
        </>
      )}
    </div>
  );
}