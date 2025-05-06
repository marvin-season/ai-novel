import { ArrowRight } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function GoSetting() {
  const navigate = useNavigate();
  return (
    <div className='h-dvh flex flex-col items-center justify-center'>
      <div className='flex items-center gap-2 p-2 cursor-pointer border-b rounded-none text-sm text-blue-500 hover:text-blue-600' onClick={() => {
        navigate('/setting')
      }} >
        前往模型配置<ArrowRight />
      </div>
    </div>
  )
}
