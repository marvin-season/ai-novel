import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PDFtoTXT() {
    const [text, setText] = useState<string>('');

    // 解析 PDF
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setText(''); // clear

        const reader = new FileReader();
        reader.onload = async (e) => {
            if (!e.target?.result) return;
            const typedArray = new Uint8Array(e.target.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                setText(prev => prev + textContent.items.map((item: any) => {
                    if (item.hasEOL) {
                        //
                        return item.str + '\n'
                    }
                    return item.str
                }).join(""));
            }

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
        <div className="h-full bg-gray-100 flex flex-col justify-center items-center p-6">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">PDF 转 TXT</h1>

            <div className="h-full w-full max-w-3xl bg-white p-8 shadow-lg rounded-xl">
                <label
                    htmlFor="pdf-upload"
                    className="w-full p-4 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-center"
                >
                    点击上传 PDF 文件
                </label>
                <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                />

                {text && (
                    <>
                        <textarea
                            value={text}
                            readOnly
                            className="w-full h-[80%] p-4 mt-8 mb-4 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono text-sm text-gray-800 overflow-auto resize-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={handleDownload}
                            className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                        >
                            下载 TXT
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}