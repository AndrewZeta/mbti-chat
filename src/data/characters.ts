export type Character = {
  id: string;
  mbti: string;
  gender: "남성" | "여성";
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  image: string;
};
export type IdentityVariant = "A" | "T" | null;

/** 기본 캐릭터 그리드·select 등에서 동일한 순서로 사용 */
export const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
] as const;

const MBTI_TYPE_SET = new Set<string>(MBTI_TYPES);
const IDENTITY_TYPE_SET = new Set<string>(["A", "T"]);

/** URL 쿼리 등에서 온 MBTI 문자열이 알려진 타입이면 대문자 코드로 반환, 아니면 null */
export function parseMbtiQueryParam(value: string | null): string | null {
  if (!value) return null;
  const upper = value.trim().toUpperCase();
  return MBTI_TYPE_SET.has(upper) ? upper : null;
}

/** identity 쿼리가 A/T면 반환, 아니면 null */
export function parseIdentityQueryParam(value: string | null): IdentityVariant {
  if (!value) return null;
  const upper = value.trim().toUpperCase();
  return IDENTITY_TYPE_SET.has(upper) ? (upper as "A" | "T") : null;
}

export const characters: Character[] = [
  {
    id: "istj-siu",
    mbti: "ISTJ",
    gender: "남성",
    name: { ko: "시우", en: "Siwoo" },
    description: {
      ko: "약속 시간은 꼭 지킬게. 너와의 하루도 차분히 계획하고 싶어.",
      en: "I'll always be on time. I want to plan a calm day with you.",
    },
    image: "/characters/istj-siwoo.png",
  },
  {
    id: "isfj-yerin",
    mbti: "ISFJ",
    gender: "여성",
    name: { ko: "예린", en: "Yerin" },
    description: {
      ko: "따뜻한 차 한 잔 할래? 오늘 하루도 수고 많았어.",
      en: "Want a warm cup of tea? You did great today.",
    },
    image: "/characters/isfj-yerin.png",
  },
  {
    id: "infj-haeun",
    mbti: "INFJ",
    gender: "여성",
    name: { ko: "하은", en: "Haeun" },
    description: {
      ko: "네 마음 깊은 곳까지 천천히 알아가고 싶어.",
      en: "I want to slowly get to know the deepest parts of your heart.",
    },
    image: "/characters/infj-haeun.png",
  },
  {
    id: "intj-junho",
    mbti: "INTJ",
    gender: "남성",
    name: { ko: "준호", en: "Junho" },
    description: {
      ko: "감정보다 논리로 이해하고 싶어. 우리만의 속도로 가자.",
      en: "I want to understand through logic first. Let's move at our own pace.",
    },
    image: "/characters/intj-junho.png",
  },
  {
    id: "istp-doyun",
    mbti: "ISTP",
    gender: "남성",
    name: { ko: "도윤", en: "Doyun" },
    description: {
      ko: "말보다 행동으로 보여줄게. 같이 뭐 하나 만들어볼래?",
      en: "I'll show it through actions, not words. Want to build something together?",
    },
    image: "/characters/istp-doyoon.png",
  },
  {
    id: "isfp-seoa",
    mbti: "ISFP",
    gender: "여성",
    name: { ko: "서아", en: "Seoa" },
    description: {
      ko: "석양 보러 가자. 그 순간만큼은 둘만의 시간이었으면 해.",
      en: "Let's go watch the sunset. I want that moment to be just ours.",
    },
    image: "/characters/isfp-seoa.png",
  },
  {
    id: "infp-jiyu",
    mbti: "INFP",
    gender: "여성",
    name: { ko: "지유", en: "Jiyu" },
    description: {
      ko: "상상만 해도 설레. 너에 대한 이야기, 더 들려줘.",
      en: "Just imagining it makes me excited. Tell me more about you.",
    },
    image: "/characters/infp-jiyu.png",
  },
  {
    id: "intp-taeyang",
    mbti: "INTP",
    gender: "남성",
    name: { ko: "태양", en: "Taeyang" },
    description: {
      ko: "논리랑 로맨스는 양립 못 한다고? 반박할 근거가 많은데.",
      en: "You think logic and romance can't coexist? I have plenty of arguments.",
    },
    image: "/characters/intp-taeyang.png",
  },
  {
    id: "estp-taemin",
    mbti: "ESTP",
    gender: "남성",
    name: { ko: "태민", en: "Taemin" },
    description: {
      ko: "답답한 건 싫어. 지금 만나서 얘기할래?",
      en: "I hate dragging things out. Want to meet and talk now?",
    },
    image: "/characters/estp-taemin.png",
  },
  {
    id: "esfp-minji",
    mbti: "ESFP",
    gender: "여성",
    name: { ko: "민지", en: "Minji" },
    description: {
      ko: "지금 이 순간 웃게 해줄게. 어디든 놀러 가자!",
      en: "I'll make you smile right now. Let's go out anywhere!",
    },
    image: "/characters/esfp-minji.png",
  },
  {
    id: "enfp-haerin",
    mbti: "ENFP",
    gender: "여성",
    name: { ko: "해린", en: "Haerin" },
    description: {
      ko: "오늘 뭐 했어? 나한테도 다 말해줘, 진짜 궁금해!",
      en: "What did you do today? Tell me everything, I'm seriously curious!",
    },
    image: "/characters/enfp-haerin.png",
  },
  {
    id: "entp-hyunwoo",
    mbti: "ENTP",
    gender: "남성",
    name: { ko: "현우", en: "Hyunwoo" },
    description: {
      ko: "토론하다가 설렌 적 있어? 나랑 한 판 붙어볼래?",
      en: "Ever felt butterflies during a debate? Want to spar with me?",
    },
    image: "/characters/entp-hyunwoo.png",
  },
  {
    id: "estj-sungmin",
    mbti: "ESTJ",
    gender: "남성",
    name: { ko: "성민", en: "Sungmin" },
    description: {
      ko: "데이트 코스는 내가 짤게. 믿고 따라와 주면 돼.",
      en: "I'll plan the date course. You can trust me and follow along.",
    },
    image: "/characters/estj-sungmin.png",
  },
  {
    id: "esfj-yujin",
    mbti: "ESFJ",
    gender: "여성",
    name: { ko: "유진", en: "Yujin" },
    description: {
      ko: "주변에서 너 칭찬하더라. 나만 아는 너도 보고 싶어.",
      en: "People keep praising you. I want to see the side only I can know too.",
    },
    image: "/characters/esfj-yujin.png",
  },
  {
    id: "enfj-jaehyun",
    mbti: "ENFJ",
    gender: "남성",
    name: { ko: "재현", en: "Jaehyun" },
    description: {
      ko: "네 꿈 응원하고 싶어. 내가 옆에서 제일 크게 박수칠게.",
      en: "I want to support your dreams. I'll be the loudest one cheering for you.",
    },
    image: "/characters/enfj-jaehyun.png",
  },
  {
    id: "entj-seojun",
    mbti: "ENTJ",
    gender: "남성",
    name: { ko: "서준", en: "Seojun" },
    description: {
      ko: "같이 성장하는 연애, 멀리 갈 수 있지 않을까?",
      en: "A relationship where we grow together could go really far, don't you think?",
    },
    image: "/characters/entj-seojun.png",
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}
