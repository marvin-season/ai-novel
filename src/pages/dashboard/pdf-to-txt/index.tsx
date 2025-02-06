import { Loading } from "@/components/loading";
import { handleDownloadText, pdfTextGenerator } from "@/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function PDFtoTXT() {
    const [text, setText] = useState<string>('');
    const [loading, setloading] = useState(false);
    useEffect(() => {
        return () => {
            setText('')
        }
    }, [])

    return (
        <div className="h-full bg-gray-100 flex flex-col justify-center items-center p-2">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">PDF 转 TXT</h1>

            <div className="flex-1 w-10/12 bg-white p-8 shadow-lg rounded-xl">
                <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={async (e) => {
                        setText('');
                        setloading(true)
                        const iter = pdfTextGenerator(e);
                        for await (const str of iter) {
                            setText(prev => prev.concat(str))
                        }
                        setloading(false)
                    }}
                    className="hidden"
                />
                {
                    loading ? <div className="h-8"><Loading /></div> : <div className="flex justify-between">
                        <label
                            htmlFor="pdf-upload"
                            className="px-4 py-3  border-2 border-indigo-300 rounded-lg cursor-pointer"
                        >
                            点击上传 PDF 文件
                        </label>
                        <button
                            onClick={() => {
                                if (!text) {
                                    toast.warning('没有文本可以下载')
                                    return
                                }
                                handleDownloadText(text)
                            }}
                            className="px-3 py-2 border-2 bg-indigo-300 rounded-lg"
                        >
                            下载 TXT
                        </button>
                    </div>
                }

                <textarea
                    value={text}
                    readOnly
                    className="w-full h-[80%] p-4 mt-8 mb-4 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono text-sm text-gray-800 overflow-auto resize-none focus:ring-2 focus:ring-indigo-500"
                />

            </div>
        </div>
    );
}