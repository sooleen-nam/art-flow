/* ============================================================
   ■ 색상 변환 유틸리티
   ============================================================ */
function hexToRgb(h) {
  return { r: parseInt(h.slice(1,3),16), g: parseInt(h.slice(3,5),16), b: parseInt(h.slice(5,7),16) };
}
function rgbToHsl(r,g,b) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0;}
  else{
    const d=max-min;
    s=l>.5?d/(2-max-min):d/(max+min);
    switch(max){
      case r:h=((g-b)/d+(g<b?6:0))/6;break;
      case g:h=((b-r)/d+2)/6;break;
      default:h=((r-g)/d+4)/6;
    }
  }
  return{h:h*360,s:s*100,l:l*100};
}
function hslToHex(h,s,l){
  h=((h%360)+360)%360; s=Math.max(0,Math.min(100,s)); l=Math.max(0,Math.min(100,l));
  s/=100;l/=100;
  const c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs((h/60)%2-1)), m=l-c/2;
  let r=0,g=0,b=0;
  if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}
  else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}
  const t=v=>Math.round((v+m)*255).toString(16).padStart(2,'0');
  return`#${t(r)}${t(g)}${t(b)}`;
}
function shiftColor(hex, delta, idx=0) {
  const {r,g,b}=hexToRgb(hex);
  const hsl=rgbToHsl(r,g,b);
  if(typeof delta === 'function') return delta(hex, idx);
  return hslToHex(hsl.h+(delta.h||0), hsl.s+(delta.s||0), hsl.l+(delta.l||0));
}

/* ============================================================
   ■ 명화 데이터
   ============================================================ */
const ARTWORKS = [
  {
    id: 'bird',
    name: '창 밖에 앉은 작은 새',
    artist: '7세 이로운',
    imageUrl: 'bird.jpg',
    outlineUrl: 'bird.coloring.dashed.png',
    difficulty: { label: '하', color: '#F4C542' },
    locked: false,
    emotionImages: {
      joy:        { url: 'bird_즐거움.png',  palette: ['#f5c842','#f5783a','#5cc068','#5a9fd4','#f5a87a'] },
      calm:       { url: 'bird_편안함.png',  palette: ['#7aaa7a','#a8c898','#5a8060','#bea860','#b8c8b0'] },
      confidence: { url: 'bird_자신감.png',  palette: ['#2563cc','#1a3f9a','#f5a823','#4a7fd4','#7aacee'] },
      curiosity:  { url: 'bird_호기심.png',  palette: ['#7b3fb5','#9b5fd0','#4ac8d4','#f5a823','#b07ad8'] },
      love:       { url: 'bird_설레임.png',   palette: ['#e07888','#e89ca8','#60a8c8','#84c4c8','#e0b4bc'] },
    },
    layers: [
      { name: '하늘 배경',    color: '#a8d8ea' },
      { name: '나뭇가지',     color: '#8b6343' },
      { name: '새 몸통',      color: '#f5a623' },
      { name: '날개',         color: '#7b7b7b' },
      { name: '부리 · 눈',   color: '#222222' },
    ]
  },
  {
    id: 'flower',
    name: '봄꽃',
    artist: '58세 김지원',
    imageUrl: 'flower.jpg',
    outlineUrl: 'flower.coloring.dashed.png',
    difficulty: { label: '중', color: '#4CAF82' },
    locked: false,
    emotionImages: {
      joy:        { url: 'flower_즐거움.png',  palette: ['#f5c800','#e84820','#4aaa30','#a05820','#f0f0e0'] },
      calm:       { url: 'flower_편안함.png',  palette: ['#88c8e8','#a0d8b8','#c0a8d8','#d4c870','#c8d8c0'] },
      confidence: { url: 'flower_자신감.png',  palette: ['#cc1820','#2838b8','#7828b0','#d4b820','#2a8830'] },
      curiosity:  { url: 'flower_호기심.png',  palette: ['#2860c8','#d83018','#7030b0','#e8a810','#2a8830'] },
      love:       { url: 'flower_설레임.png',  palette: ['#f0a8c0','#f8c890','#e8d0a0','#d4a8b8','#5a9840'] },
    },
    layers: [
      { name: '배경',         color: '#fff9e6' },
      { name: '꽃잎',         color: '#f9a8d4' },
      { name: '꽃술',         color: '#fbbf24' },
      { name: '줄기 · 잎',   color: '#4ade80' },
      { name: '그림자',       color: '#e0d4c8' },
    ]
  },
  {
    id: 'grandma',
    name: '우리 할머니',
    artist: '15세 남수린',
    imageUrl: 'grandma.jpg',
    outlineUrl: 'grandma.coloring.jpg',
    difficulty: { label: '중', color: '#4CAF82' },
    locked: true,
    layers: [
      { name: '피부',         color: '#e8b89a' },
      { name: '머리카락',     color: '#c0c0c0' },
      { name: '옷',           color: '#6b93c4' },
      { name: '배경',         color: '#f0ece4' },
      { name: '얼굴 표정',    color: '#8b5e3c' },
    ]
  },
  {
    id: 'pearl',
    name: '진주 귀고리를 한 소녀',
    artist: '요하네스 베르메르',
    imageUrl: 'image1.jpg',
    outlineUrl: 'image1_도안.png',
    difficulty: { label: '상', color: '#F06292' },
    locked: true,
    layers: [
      { name: '어두운 배경',  color: '#0d0a07' },
      { name: '피부 · 얼굴',  color: '#c9956b' },
      { name: '파란 터번',    color: '#7090c5' },
      { name: '금빛 옷감',    color: '#d4b054' },
      { name: '진주 · 흰옷',  color: '#e8ddd0' },
    ]
  },
  {
    id: 'starry',
    name: '별이 빛나는 밤',
    artist: '빈센트 반 고흐',
    imageUrl: 'image2.jpg',
    difficulty: { label: '상', color: '#F06292' },
    locked: true,
    layers: [
      { name: '짙은 밤하늘',  color: '#1e3a7a' },
      { name: '소용돌이',     color: '#4a78b8' },
      { name: '별 · 달빛',   color: '#f0e870' },
      { name: '마을',         color: '#c8c890' },
      { name: '사이프러스',   color: '#2a1e0c' },
    ]
  },
  {
    id: 'bedroom',
    name: '아를의 침실',
    artist: '빈센트 반 고흐',
    imageUrl: 'image3.jpg',
    difficulty: { label: '최상', color: '#e84393' },
    locked: true,
    layers: [
      { name: '파란 벽',      color: '#a0b8cc' },
      { name: '노란 가구',    color: '#d4a020' },
      { name: '붉은 이불',    color: '#c04010' },
      { name: '초록 창문',    color: '#78a030' },
      { name: '나무 바닥',    color: '#c8a868' },
    ]
  }
];

/* ============================================================
   ■ 감정 데이터
   ============================================================ */
const EMOTIONS = [
  {
    id: 'joy',
    tutorMsg: 'AI 마음튜터가 밝고 신나는 마음으로 그릴 수 있도록 실시간으로 도와줄게요',
    name: '즐거움', icon: '',
    desc: '둥글고 경쾌한 선으로<br>밝고 신나는 마음을 연습해요',
    lineHint: '둥글고 경쾌한 선',
    patternHint: '점, 작은 별, 반짝임',
    feel: '밝고 신나는 느낌',
    color: '#FFD600',
    gradient: 'linear-gradient(135deg,#F9A825,#FFF176)',
    transform: (c) => shiftColor(c, { s: +30, l: +15 }),
    defaultBrush: 5,
    coaching: [
      '너무 심각하게 그리고 있는데? 선을 둥글게 경쾌하게 그려봐!',
      '어두운 색보다는 노랑, 연핑크, 민트 색을 써보는 게 어때?!',
      '색칠만 하지말고, 그 위에 귀여운 점이나 별 모양도 그려봐!',
    ],
    resultMain: '밝고 신나는 즐거운 마음이 그림 가득 담겼어요!',
    anim: 'stars',
  },
  {
    id: 'calm',
    tutorMsg: 'AI 마음튜터가 천천히 차분한 마음으로 그릴 수 있도록 실시간으로 도와줄게요',
    name: '편안함', icon: '', exampleImg: 'bird_편안함.png',
    desc: '부드러운 곡선으로 천천히<br>차분하고 안정된 마음을 연습해요',
    lineHint: '부드러운 곡선, 느린 흐름',
    patternHint: '물결, 구름 형태',
    feel: '차분하고 안정된 느낌',
    color: '#7BC67E',
    gradient: 'linear-gradient(135deg,#43A047,#A5D6A7)',
    transform: (c) => shiftColor(c, { s: -25, l: +18 }),
    defaultBrush: 4,
    coaching: [
      '너무 빠르게 그리고 있어! 좀 더 천천히 부드러운 곡선으로 그려봐!',
      '몽글몽글한 파스텔 톤으로 물결처럼 표현해보면 어떨까?!',
      '너무 다 채우지 않아도 괜찮아! 빈 공간도 충분히 남겨줘.',
    ],
    resultMain: '차분하고 안정된 마음이 잘 담겼어요!',
    anim: 'waves',
  },
  {
    id: 'confidence',
    locked: false,
    tutorMsg: 'AI 마음튜터가 힘차고 당당한 마음으로 그릴 수 있도록 실시간으로 도와줄게요',
    name: '자신감', icon: '',
    desc: '또렷하고 힘 있는 선으로<br>힘있고 당당한 마음을 연습해요',
    lineHint: '또렷하고 힘 있는 선',
    patternHint: '반복 선, 강조 라인',
    feel: '힘있고 당당한 느낌',
    color: '#EF5350',
    gradient: 'linear-gradient(135deg,#E53935,#FF8A80)',
    transform: (c) => shiftColor(c, { h: +40, s: +35, l: -8 }),
    defaultBrush: 8,
    coaching: [
      '기운이 조금 없어보여! 좀 더 힘을 내서 또렷하게 그려봐!',
      '선명한 초록, 파랑 색을 과감하게 써볼까?!',
      '강조하고 싶은 부분이 있다면, 반복해서 그려보는 것도 좋아!',
    ],
    resultMain: '힘있고 당당한 자신감이 그림에 넘쳐요!',
    anim: 'glow',
  },
  {
    id: 'curiosity',
    locked: false,
    tutorMsg: 'AI 마음튜터가 자유롭고 상상하는 마음으로 그리도록 실시간으로 도와줄게요',
    name: '호기심', icon: '',
    desc: '불규칙한 선과 다양한 색으로<br>자유롭고 탐구적인 마음을 연습해요',
    lineHint: '불규칙 선, 점선',
    patternHint: '작은 점, 짧은 선 반복',
    feel: '자유롭고 탐구적인 느낌',
    color: '#B39DDB',
    gradient: 'linear-gradient(135deg,#7E57C2,#D1C4E9)',
    transform: (c, i) => shiftColor(c, { h: (i * 60) % 180 - 90, s: +20 }),
    defaultBrush: 4,
    coaching: [
      '정해진대로 그리지 말고, 불규칙하고 자유로운 선도 도전해봐!',
      '다양한 색을 섞어서 변화를 줘볼까?!',
      '새로운 무늬와 짧은 선을 여기저기 넣어봐!',
    ],
    resultMain: '자유롭고 탐구적인 마음이 그림 곳곳에 담겼어요!',
    anim: 'dots',
  },
  {
    id: 'love',
    locked: false,
    tutorMsg: 'AI 마음튜터가 설레는 마음으로 그릴 수 있도록 실시간으로 도와줄게요',
    name: '설레임', icon: '',
    desc: '부드럽고 따뜻한 선으로<br>설레는 마음을 담아요',
    lineHint: '부드럽고 둥근 선',
    patternHint: '하트, 꽃, 별',
    feel: '설레고 따뜻한 느낌',
    color: '#F48FB1',
    gradient: 'linear-gradient(135deg,#F06292,#FCE4EC)',
    transform: (c) => shiftColor(c, { h: +10, s: +20, l: +5 }),
    defaultBrush: 7,
    coaching: [
      '하트나 작은 꽃을 넣으면 더 설레는 느낌이 날 거야! 💕',
      '분홍이나 따뜻한 색을 더 써봐! 더 예뻐질 거야 🌸',
      '선을 부드럽고 둥글게 그려봐~ 설레임이 가득해질 거야!',
    ],
    resultMain: '설레고 따뜻한 마음이 그림에 가득 담겼어요!',
    anim: 'hearts',
  },
];

/* ============================================================
   ■ sessionStorage 헬퍼
   ============================================================ */
function getArtwork() {
  const id = sessionStorage.getItem('artworkId');
  return ARTWORKS.find(a => a.id === id) || null;
}
function getEmotion() {
  const id = sessionStorage.getItem('emotionId');
  return EMOTIONS.find(e => e.id === id) || null;
}
