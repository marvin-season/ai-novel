import { Novel } from "@/store/novel";

type Props<T extends Novel = Novel> = {
  novel: T;
  onClick: (novel: T) => void;
};

export default function NovelCard({ novel, onClick }: Props) {
  return (
    <div
      key={novel.id}
      className="border p-4 rounded-lg border-gray-200 hover:shadow-lg pb-4 min-w-[400px]"
      onClick={() => {
        onClick(novel);
      }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {novel.title}
      </h3>
      <p className="text-xs text-gray-500 mb-1">
        创建时间：
        {novel.createTime
          ? new Date(novel.createTime).toLocaleString()
          : "未知"}
      </p>
    </div>
  );
}
