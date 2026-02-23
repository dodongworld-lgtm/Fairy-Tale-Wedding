export interface DisneyCharacter {
  id: string
  name: string
  nameEn: string
  emoji: string
  color: string // Tailwind gradient classes
}

export const DISNEY_CHARACTERS: DisneyCharacter[] = [
  { id: 'belle',       name: '벨',       nameEn: 'Belle',        emoji: '📚', color: 'from-yellow-400 to-amber-500'   },
  { id: 'ariel',       name: '아리엘',   nameEn: 'Ariel',        emoji: '🧜', color: 'from-teal-400 to-cyan-600'      },
  { id: 'cinderella',  name: '신데렐라', nameEn: 'Cinderella',   emoji: '👠', color: 'from-sky-300 to-blue-500'       },
  { id: 'rapunzel',    name: '라푼젤',   nameEn: 'Rapunzel',     emoji: '🌸', color: 'from-purple-400 to-violet-600'  },
  { id: 'aurora',      name: '오로라',   nameEn: 'Aurora',       emoji: '✨', color: 'from-pink-400 to-rose-500'      },
  { id: 'snow_white',  name: '백설공주', nameEn: 'Snow White',   emoji: '🍎', color: 'from-red-400 to-rose-600'       },
  { id: 'moana',       name: '모아나',   nameEn: 'Moana',        emoji: '🌊', color: 'from-blue-400 to-indigo-600'    },
  { id: 'tiana',       name: '티아나',   nameEn: 'Tiana',        emoji: '🐸', color: 'from-green-400 to-emerald-600'  },
  { id: 'jasmine',     name: '재스민',   nameEn: 'Jasmine',      emoji: '🌙', color: 'from-indigo-400 to-purple-600'  },
  { id: 'beast',       name: '야수',     nameEn: 'Beast',        emoji: '🌹', color: 'from-blue-600 to-slate-700'     },
  { id: 'eric',        name: '에릭',     nameEn: 'Eric',         emoji: '⚓', color: 'from-blue-500 to-blue-700'      },
  { id: 'aladdin',     name: '알라딘',   nameEn: 'Aladdin',      emoji: '🪔', color: 'from-orange-400 to-amber-600'   },
  { id: 'flynn',       name: '플린',     nameEn: 'Flynn Rider',  emoji: '🤠', color: 'from-amber-500 to-orange-700'   },
  { id: 'philip',      name: '필립왕자', nameEn: 'Prince Philip', emoji: '⚔️', color: 'from-violet-500 to-indigo-700' },
  { id: 'naveen',      name: '나빈왕자', nameEn: 'Prince Naveen', emoji: '🎺', color: 'from-emerald-500 to-teal-700'  },
]

export interface CharacterAssignment {
  person: string
  character: DisneyCharacter
}

export function assignRandomCharacters(person1: string, person2: string): CharacterAssignment[] {
  const shuffled = [...DISNEY_CHARACTERS].sort(() => Math.random() - 0.5)
  return [
    { person: person1 || '나', character: shuffled[0] },
    { person: person2 || '상대방', character: shuffled[1] },
  ]
}

export type Background = 'castle' | 'forest' | 'sea' | 'meadow' | 'city' | 'palace'

export interface CutTemplate {
  id: number
  sceneTitle: string
  background: Background
  dialogue: string
}

export interface StoryTemplate {
  id: string
  title: string
  subtitle: string
  cuts: CutTemplate[]
}

export const STORIES_BY_TEMPLATE: Record<string, StoryTemplate[]> = {
  'propose-ring': [
    {
      id: 'propose-ring-1',
      title: '첫 만남부터 반지까지',
      subtitle: '운명처럼 시작된 우리 이야기',
      cuts: [
        { id: 1, sceneTitle: '운명의 첫 만남',     background: 'city',   dialogue: '그 날 처음 눈이 마주쳤을 때, 세상이 멈춘 것 같았어요.' },
        { id: 2, sceneTitle: '함께한 첫 계절',     background: 'meadow', dialogue: '봄바람이 불던 날, 우리는 처음으로 손을 잡았죠.' },
        { id: 3, sceneTitle: '소중한 추억들',      background: 'forest', dialogue: '크고 작은 추억들이 쌓이며, 너는 내 일상이 되었어.' },
        { id: 4, sceneTitle: '마음을 전하는 순간', background: 'palace', dialogue: '평생 네 곁에 있고 싶어. 나랑 결혼해줄래?' },
        { id: 5, sceneTitle: '영원한 약속',        background: 'castle', dialogue: '이 반지처럼, 우리의 사랑도 영원히 빛날 거야.' },
      ],
    },
    {
      id: 'propose-ring-2',
      title: '우리의 계절',
      subtitle: '사계절처럼 깊어진 사랑',
      cuts: [
        { id: 1, sceneTitle: '봄 — 설레는 시작',    background: 'meadow', dialogue: '벚꽃이 피던 날, 너를 처음 만났어.' },
        { id: 2, sceneTitle: '여름 — 뜨거운 여름',  background: 'sea',    dialogue: '파도 소리와 함께, 우리의 사랑도 깊어졌어.' },
        { id: 3, sceneTitle: '가을 — 익어가는 마음', background: 'forest', dialogue: '단풍처럼 물들어가는 너와의 시간이 행복해.' },
        { id: 4, sceneTitle: '겨울 — 따뜻한 두 손', background: 'castle', dialogue: '추운 겨울에도 네 손을 잡으면 따뜻했어.' },
        { id: 5, sceneTitle: '모든 계절, 함께',     background: 'palace', dialogue: '앞으로의 모든 계절도 너와 함께하고 싶어.' },
      ],
    },
    {
      id: 'propose-ring-3',
      title: '마법 같은 하루',
      subtitle: '잊을 수 없는 특별한 순간',
      cuts: [
        { id: 1, sceneTitle: '평범한 아침',   background: 'city',   dialogue: '그날도 평범한 하루가 될 줄 알았어.' },
        { id: 2, sceneTitle: '함께한 산책',   background: 'meadow', dialogue: '네 옆에서 걷는 것만으로도 특별한 하루가 됐어.' },
        { id: 3, sceneTitle: '비밀 준비',     background: 'forest', dialogue: '오랫동안 이 순간을 준비해왔어.' },
        { id: 4, sceneTitle: '마법의 순간',   background: 'palace', dialogue: '오늘 이 순간, 너에게 영원을 물어볼게.' },
        { id: 5, sceneTitle: '새로운 시작',   background: 'castle', dialogue: '오늘부터 우리의 새로운 이야기가 시작돼.' },
      ],
    },
  ],

  'propose-recommend': [
    {
      id: 'propose-recommend-1',
      title: 'AI 추천 스토리',
      subtitle: 'AI가 우리에게 딱 맞는 이야기를 골랐어요',
      cuts: [
        { id: 1, sceneTitle: '인연의 시작',   background: 'city',   dialogue: '수많은 사람 중에 너를 만난 건 기적이야.' },
        { id: 2, sceneTitle: '함께 성장',     background: 'forest', dialogue: '네 덕분에 나는 조금 더 나은 사람이 됐어.' },
        { id: 3, sceneTitle: '어려운 순간',   background: 'sea',    dialogue: '힘들 때마다 네가 옆에 있어줘서 버틸 수 있었어.' },
        { id: 4, sceneTitle: '확신의 순간',   background: 'meadow', dialogue: '너와 함께라면 어떤 미래도 두렵지 않아.' },
        { id: 5, sceneTitle: '청혼',          background: 'palace', dialogue: '나랑 평생 함께해줄 수 있어?' },
      ],
    },
    {
      id: 'propose-recommend-2',
      title: '추억의 순간들',
      subtitle: '함께한 시간이 우리를 만들었어요',
      cuts: [
        { id: 1, sceneTitle: '첫 데이트',        background: 'city',   dialogue: '긴장되는 마음으로 나간 첫 데이트, 기억해?' },
        { id: 2, sceneTitle: '여행의 설렘',      background: 'sea',    dialogue: '처음 함께한 여행에서 너의 새로운 모습을 봤어.' },
        { id: 3, sceneTitle: '일상의 행복',      background: 'meadow', dialogue: '특별한 일 없이도 네 옆이면 충분히 행복해.' },
        { id: 4, sceneTitle: '서로를 알아가며',  background: 'forest', dialogue: '시간이 지날수록 너를 더 알고 싶어졌어.' },
        { id: 5, sceneTitle: '영원한 추억을 위해', background: 'castle', dialogue: '이 추억들을 영원히 함께 만들고 싶어.' },
      ],
    },
    {
      id: 'propose-recommend-3',
      title: '우리만의 이야기',
      subtitle: '세상에 하나뿐인 우리의 스토리',
      cuts: [
        { id: 1, sceneTitle: '나만 아는 너',     background: 'palace', dialogue: '남들이 모르는 너의 모습을 나만 알고 있어.' },
        { id: 2, sceneTitle: '웃음 가득한 날들', background: 'meadow', dialogue: '너와 함께라면 별것도 아닌 게 다 재밌어.' },
        { id: 3, sceneTitle: '기댈 수 있는 사람', background: 'castle', dialogue: '힘들 때 전화할 수 있는 사람이 생겼다는 게 행복해.' },
        { id: 4, sceneTitle: '함께 그리는 미래', background: 'city',   dialogue: '너와 함께 그려보는 미래가 설레고 기대돼.' },
        { id: 5, sceneTitle: '평생의 파트너',    background: 'forest', dialogue: '나의 평생 파트너가 되어줘.' },
      ],
    },
  ],

  'propose-custom': [
    {
      id: 'propose-custom-1',
      title: '자유 스토리',
      subtitle: '직접 모든 대사를 써보세요',
      cuts: [
        { id: 1, sceneTitle: '장면 1', background: 'city',   dialogue: '첫 번째 장면의 대사를 직접 써보세요.' },
        { id: 2, sceneTitle: '장면 2', background: 'meadow', dialogue: '두 번째 장면의 대사를 직접 써보세요.' },
        { id: 3, sceneTitle: '장면 3', background: 'forest', dialogue: '세 번째 장면의 대사를 직접 써보세요.' },
        { id: 4, sceneTitle: '장면 4', background: 'sea',    dialogue: '네 번째 장면의 대사를 직접 써보세요.' },
        { id: 5, sceneTitle: '장면 5', background: 'castle', dialogue: '다섯 번째 장면의 대사를 직접 써보세요.' },
      ],
    },
    {
      id: 'propose-custom-2',
      title: '동화 속 우리',
      subtitle: '우리가 동화의 주인공이 된다면',
      cuts: [
        { id: 1, sceneTitle: '동화의 시작', background: 'forest', dialogue: '옛날 옛날에, 두 사람이 운명처럼 만났답니다.' },
        { id: 2, sceneTitle: '모험의 시작', background: 'castle', dialogue: '함께라면 어떤 모험도 두렵지 않았어요.' },
        { id: 3, sceneTitle: '시련을 넘어', background: 'sea',    dialogue: '폭풍이 몰아쳐도 두 사람의 손은 놓지 않았어요.' },
        { id: 4, sceneTitle: '사랑의 고백', background: 'palace', dialogue: '마침내 왕자는 공주에게 말했어요. 나와 함께해줘.' },
        { id: 5, sceneTitle: '영원한 행복', background: 'meadow', dialogue: '그리하여 두 사람은 영원히 행복하게 살았답니다.' },
      ],
    },
    {
      id: 'propose-custom-3',
      title: '특별한 날',
      subtitle: '오늘 이 순간을 영원히',
      cuts: [
        { id: 1, sceneTitle: '오늘을 위한 준비',  background: 'city',   dialogue: '오늘 이 순간을 위해 오랫동안 준비했어.' },
        { id: 2, sceneTitle: '너를 향한 마음',    background: 'meadow', dialogue: '매일 네 생각을 하며 이 말을 연습했어.' },
        { id: 3, sceneTitle: '우리가 걸어온 길',  background: 'forest', dialogue: '여기까지 함께 와줘서 고마워.' },
        { id: 4, sceneTitle: '이 순간의 약속',    background: 'palace', dialogue: '오늘부터 매일이 특별한 날이 되도록 노력할게.' },
        { id: 5, sceneTitle: '새로운 장',         background: 'castle', dialogue: '우리 이야기의 다음 장, 함께 써줄래?' },
      ],
    },
  ],

  'wedding-why': [
    {
      id: 'wedding-why-1',
      title: '당신과 결혼하는 이유',
      subtitle: '내가 이 사람을 선택한 모든 이유',
      cuts: [
        { id: 1, sceneTitle: '첫 번째 이유', background: 'meadow', dialogue: '네가 웃을 때, 세상이 더 밝아지기 때문이야.' },
        { id: 2, sceneTitle: '두 번째 이유', background: 'forest', dialogue: '힘들 때 말 안 해도 알아채주는 네가 있어서야.' },
        { id: 3, sceneTitle: '세 번째 이유', background: 'sea',    dialogue: '네 옆에 있으면 나도 더 나은 사람이 되고 싶어지거든.' },
        { id: 4, sceneTitle: '네 번째 이유', background: 'castle', dialogue: '우리가 함께 웃었던 그 모든 순간들 때문이야.' },
        { id: 5, sceneTitle: '가장 큰 이유', background: 'palace', dialogue: '이유가 너무 많아서, 이 자리에서 평생 이야기할게.' },
      ],
    },
    {
      id: 'wedding-why-2',
      title: '영원한 약속',
      subtitle: '오늘부터 영원을 함께',
      cuts: [
        { id: 1, sceneTitle: '약속의 의미',   background: 'palace', dialogue: '결혼이란, 매일 서로를 선택하는 약속이라 생각해.' },
        { id: 2, sceneTitle: '함께할 기쁨',   background: 'meadow', dialogue: '기쁜 일은 더 크게, 슬픈 일은 더 작게 만들어줄게.' },
        { id: 3, sceneTitle: '서로의 버팀목', background: 'forest', dialogue: '흔들릴 때마다 서로의 손을 잡아주자.' },
        { id: 4, sceneTitle: '함께 만들 미래', background: 'city',  dialogue: '아직 쓰지 않은 우리의 이야기가 기대돼.' },
        { id: 5, sceneTitle: '오늘의 서약',   background: 'castle', dialogue: '오늘 이 자리에서 영원을 약속할게.' },
      ],
    },
    {
      id: 'wedding-why-3',
      title: '함께이기에',
      subtitle: '너이기 때문에 가능한 것들',
      cuts: [
        { id: 1, sceneTitle: '너이기에 용기 냈어', background: 'city',   dialogue: '네가 있어서 두렵지 않게 도전할 수 있었어.' },
        { id: 2, sceneTitle: '너이기에 쉬워졌어', background: 'meadow', dialogue: '힘든 것도 네 옆에선 조금 쉬워졌어.' },
        { id: 3, sceneTitle: '너이기에 웃어',     background: 'sea',    dialogue: '별것도 아닌 데 자꾸 웃게 만드는 건 너야.' },
        { id: 4, sceneTitle: '너이기에 사랑해',   background: 'forest', dialogue: '세상 누구도 아닌, 너이기 때문에 사랑해.' },
        { id: 5, sceneTitle: '함께이기에',        background: 'palace', dialogue: '앞으로도 함께이기에 무엇이든 가능할 것 같아.' },
      ],
    },
  ],

  'wedding-memories': [
    {
      id: 'wedding-memories-1',
      title: '사랑의 기억들',
      subtitle: '함께 쌓아온 소중한 순간들',
      cuts: [
        { id: 1, sceneTitle: '처음 만난 날',  background: 'city',   dialogue: '처음 봤을 때부터 뭔가 달랐어. 그 느낌이 맞았어.' },
        { id: 2, sceneTitle: '첫 여행',       background: 'sea',    dialogue: '처음 함께한 여행, 아직도 생생하게 기억해.' },
        { id: 3, sceneTitle: '함께한 일상',   background: 'city',   dialogue: '어느 날부터 평범한 일상이 특별해졌어.' },
        { id: 4, sceneTitle: '힘들었던 순간', background: 'forest', dialogue: '가장 힘들었을 때 네가 곁에 있었어.' },
        { id: 5, sceneTitle: '오늘의 행복',   background: 'palace', dialogue: '그 모든 기억들이 오늘 이 자리를 만들었어.' },
      ],
    },
    {
      id: 'wedding-memories-2',
      title: '우리의 발자취',
      subtitle: '걸어온 길이 만든 오늘',
      cuts: [
        { id: 1, sceneTitle: '출발점',      background: 'meadow', dialogue: '여기서부터 시작이었어. 우리의 첫 걸음.' },
        { id: 2, sceneTitle: '함께 걷는 길', background: 'forest', dialogue: '때로는 빠르게, 때로는 느리게 함께 걸었어.' },
        { id: 3, sceneTitle: '흔적들',      background: 'castle', dialogue: '우리가 지나간 곳엔 항상 좋은 기억이 남았어.' },
        { id: 4, sceneTitle: '새로운 길목', background: 'sea',    dialogue: '이제 새로운 길을 함께 걸어가려 해.' },
        { id: 5, sceneTitle: '영원히 함께', background: 'palace', dialogue: '어디를 가든, 항상 함께야.' },
      ],
    },
    {
      id: 'wedding-memories-3',
      title: '두 마음이 하나로',
      subtitle: '서로 다른 두 사람이 하나가 되는 이야기',
      cuts: [
        { id: 1, sceneTitle: '서로 다른 둘', background: 'city',   dialogue: '처음엔 우리가 이렇게 잘 맞을 줄 몰랐어.' },
        { id: 2, sceneTitle: '맞춰가며',     background: 'meadow', dialogue: '다른 점들이 오히려 서로를 채워줬어.' },
        { id: 3, sceneTitle: '이해하며',     background: 'forest', dialogue: '너를 알아갈수록 더 좋아지는 게 이상하고 좋았어.' },
        { id: 4, sceneTitle: '하나가 되어',  background: 'sea',    dialogue: '어느 순간 우리는 한 팀이 되어 있었어.' },
        { id: 5, sceneTitle: '오늘, 하나로', background: 'castle', dialogue: '오늘 두 마음이 공식적으로 하나가 됩니다.' },
      ],
    },
  ],

  'wedding-story': [
    {
      id: 'wedding-story-1',
      title: '처음 만난 날',
      subtitle: '모든 것이 시작된 그 순간',
      cuts: [
        { id: 1, sceneTitle: '그날의 기억',    background: 'city',   dialogue: '처음 만난 날, 집에 돌아와서도 네 생각이 났어.' },
        { id: 2, sceneTitle: '다시 보고 싶었어', background: 'meadow', dialogue: '어떻게 하면 또 볼 수 있을까 고민했어.' },
        { id: 3, sceneTitle: '가까워지며',     background: 'forest', dialogue: '만날수록 더 알고 싶고, 더 보고 싶었어.' },
        { id: 4, sceneTitle: '마음을 확인하며', background: 'sea',    dialogue: '네가 내 사람이라는 걸 확신했어.' },
        { id: 5, sceneTitle: '처음 만난 날부터 오늘까지', background: 'palace', dialogue: '그날 만나지 않았다면 오늘은 없었겠지.' },
      ],
    },
    {
      id: 'wedding-story-2',
      title: '우리의 여정',
      subtitle: '함께 써온 우리만의 이야기',
      cuts: [
        { id: 1, sceneTitle: '설레는 시작',   background: 'meadow', dialogue: '함께한다는 게 이렇게 행복한 줄 몰랐어.' },
        { id: 2, sceneTitle: '쌓여가는 시간', background: 'city',   dialogue: '하루하루가 쌓여 우리가 되었어.' },
        { id: 3, sceneTitle: '함께 넘은 고비', background: 'sea',    dialogue: '힘든 시간도 함께라서 이겨낼 수 있었어.' },
        { id: 4, sceneTitle: '성장',          background: 'forest', dialogue: '네 덕분에 나도 많이 성장했어.' },
        { id: 5, sceneTitle: '다음 챕터',     background: 'castle', dialogue: '우리 이야기의 다음 챕터가 시작돼.' },
      ],
    },
    {
      id: 'wedding-story-3',
      title: '새로운 시작',
      subtitle: '오늘이 우리 이야기의 새 장',
      cuts: [
        { id: 1, sceneTitle: '지나온 시간', background: 'forest', dialogue: '우리가 함께해온 시간이 이 자리를 만들었어.' },
        { id: 2, sceneTitle: '감사함',      background: 'meadow', dialogue: '여기까지 함께해줘서 진심으로 고마워.' },
        { id: 3, sceneTitle: '오늘의 다짐', background: 'palace', dialogue: '오늘부터는 더 잘해줄게. 약속해.' },
        { id: 4, sceneTitle: '함께 꿀 꿈',  background: 'castle', dialogue: '우리 함께 꾸고 싶은 꿈이 너무 많아.' },
        { id: 5, sceneTitle: '새로운 아침', background: 'sea',    dialogue: '오늘부터 매일 아침 네 얼굴을 볼 수 있어 행복해.' },
      ],
    },
  ],
}
