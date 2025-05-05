import { Novel } from '@/store/novel'

type Props<T extends Novel = Novel> = {
  novel: T,
  onClick: (novel: T) => void
}

export default function NovelCard({ novel, onClick }: Props) {
  return (
    <div
      key={novel.id}
      className="border p-2 rounded-lg border-gray-200 hover:shadow-lg pb-4"
      onClick={() => {
        onClick(novel)
      }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{novel.title}</h3>
      <p className="text-xs text-gray-500 mb-1">
        创建时间：{novel.createTime ? new Date(novel.createTime).toLocaleString() : '未知'}
      </p>
      <p className="text-sm text-gray-700 line-clamp-3">{novel.content!.slice(0, 100)}...</p>
    </div>
  )
}