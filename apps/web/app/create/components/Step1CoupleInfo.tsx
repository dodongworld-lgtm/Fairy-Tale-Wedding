'use client'
import { useForm } from 'react-hook-form'

type FormData = {
  person1: string
  person2: string
  firstMeetDate: string
  firstMeetPlace: string
  memories: string
  proposeMessage: string
}

export function Step1CoupleInfo({ onNext }: { onNext: (data: any) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    onNext({ ...data, memories: data.memories ? data.memories.split(',').map((m: string) => m.trim()).filter(Boolean) : [] })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-5">
      <h2 className="text-2xl font-bold text-white text-center">두 분의 이야기를 알려주세요</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-purple-200 text-sm block mb-1">나의 이름</label>
          <input {...register('person1', { required: true })}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:border-yellow-400"
            placeholder="이름을 입력하세요" />
          {errors.person1 && <p className="text-red-400 text-xs mt-1">필수 항목입니다</p>}
        </div>
        <div>
          <label className="text-purple-200 text-sm block mb-1">상대방 이름</label>
          <input {...register('person2', { required: true })}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:border-yellow-400"
            placeholder="이름을 입력하세요" />
          {errors.person2 && <p className="text-red-400 text-xs mt-1">필수 항목입니다</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-purple-200 text-sm block mb-1">첫 만남 날짜</label>
          <input type="date" {...register('firstMeetDate')}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-purple-400 focus:outline-none focus:border-yellow-400" />
        </div>
        <div>
          <label className="text-purple-200 text-sm block mb-1">첫 만남 장소</label>
          <input {...register('firstMeetPlace')}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:border-yellow-400"
            placeholder="예: 홍대 카페" />
        </div>
      </div>
      <div>
        <label className="text-purple-200 text-sm block mb-1">함께한 특별한 기억 (쉼표로 구분)</label>
        <input {...register('memories')}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:border-yellow-400"
          placeholder="예: 제주도 여행, 새벽 드라이브" />
      </div>
      <div>
        <label className="text-purple-200 text-sm block mb-1">프로포즈 메시지 *</label>
        <textarea {...register('proposeMessage', { required: true })} rows={3}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-300 border border-purple-400 focus:outline-none focus:border-yellow-400"
          placeholder="예: 평생 내 곁에 있어줄래?" />
        {errors.proposeMessage && <p className="text-red-400 text-xs mt-1">필수 항목입니다</p>}
      </div>
      <button type="submit" className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold rounded-xl text-lg transition-colors">
        다음 단계 →
      </button>
    </form>
  )
}
