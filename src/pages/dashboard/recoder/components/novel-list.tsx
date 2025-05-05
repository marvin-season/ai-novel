import { useNovelStore } from '@/store/novel'
import { useNavigate, useNavigation } from 'react-router-dom'

type Props = {}

export default function NovelList({ }: Props) {
    const navigate = useNavigate()
    const { novels } = useNovelStore()
    return (
      <div className="space-y-4 p-4">
        {novels.map((novel) => (
          <div
            key={novel.id}
            className="border-b border-gray-200 pb-4"
            onClick={() => {
                useNovelStore.getState().setNovelId(novel.id)
                navigate('/');
            }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{novel.title}</h3>
            <p className="text-xs text-gray-500 mb-1">
              创建时间：{novel.createTime ? new Date(novel.createTime).toLocaleString() : '未知'}
            </p>
            <p className="text-sm text-gray-700 line-clamp-3">{novel.content!.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    )
}