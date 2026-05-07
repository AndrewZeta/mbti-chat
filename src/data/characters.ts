export type Character = {
  id: string;
  mbti: string;
  gender: "남성" | "여성";
  name: string;
  tagline: string;
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
    name: "시우",
    tagline: "약속 시간은 꼭 지킬게. 너와의 하루도 차분히 계획하고 싶어.",
    image: "/characters/istj-siwoo.png",
  },
  {
    id: "isfj-yerin",
    mbti: "ISFJ",
    gender: "여성",
    name: "예린",
    tagline: "따뜻한 차 한 잔 할래? 오늘 하루도 수고 많았어.",
    image: "/characters/isfj-yerin.png",
  },
  {
    id: "infj-haeun",
    mbti: "INFJ",
    gender: "여성",
    name: "하은",
    tagline: "네 마음 깊은 곳까지 천천히 알아가고 싶어.",
    image: "/characters/infj-haeun.png",
  },
  {
    id: "intj-junho",
    mbti: "INTJ",
    gender: "남성",
    name: "준호",
    tagline: "감정보다 논리로 이해하고 싶어. 우리만의 속도로 가자.",
    image: "/characters/intj-junho.png",
  },
  {
    id: "istp-doyun",
    mbti: "ISTP",
    gender: "남성",
    name: "도윤",
    tagline: "말보다 행동으로 보여줄게. 같이 뭐 하나 만들어볼래?",
    image: "/characters/istp-doyoon.png",
  },
  {
    id: "isfp-seoa",
    mbti: "ISFP",
    gender: "여성",
    name: "서아",
    tagline: "석양 보러 가자. 그 순간만큼은 둘만의 시간이었으면 해.",
    image: "/characters/isfp-seoa.png",
  },
  {
    id: "infp-jiyu",
    mbti: "INFP",
    gender: "여성",
    name: "지유",
    tagline: "상상만 해도 설레. 너에 대한 이야기, 더 들려줘.",
    image: "/characters/infp-jiyu.png",
  },
  {
    id: "intp-taeyang",
    mbti: "INTP",
    gender: "남성",
    name: "태양",
    tagline: "논리랑 로맨스는 양립 못 한다고? 반박할 근거가 많은데.",
    image: "/characters/intp-taeyang.png",
  },
  {
    id: "estp-taemin",
    mbti: "ESTP",
    gender: "남성",
    name: "태민",
    tagline: "답답한 건 싫어. 지금 만나서 얘기할래?",
    image: "/characters/estp-taemin.png",
  },
  {
    id: "esfp-minji",
    mbti: "ESFP",
    gender: "여성",
    name: "민지",
    tagline: "지금 이 순간 웃게 해줄게. 어디든 놀러 가자!",
    image: "/characters/esfp-minji.png",
  },
  {
    id: "enfp-haerin",
    mbti: "ENFP",
    gender: "여성",
    name: "해린",
    tagline: "오늘 뭐 했어? 나한테도 다 말해줘, 진짜 궁금해!",
    image: "/characters/enfp-haerin.png",
  },
  {
    id: "entp-hyunwoo",
    mbti: "ENTP",
    gender: "남성",
    name: "현우",
    tagline: "토론하다가 설렌 적 있어? 나랑 한 판 붙어볼래?",
    image: "/characters/entp-hyunwoo.png",
  },
  {
    id: "estj-sungmin",
    mbti: "ESTJ",
    gender: "남성",
    name: "성민",
    tagline: "데이트 코스는 내가 짤게. 믿고 따라와 주면 돼.",
    image: "/characters/estj-sungmin.png",
  },
  {
    id: "esfj-yujin",
    mbti: "ESFJ",
    gender: "여성",
    name: "유진",
    tagline: "주변에서 너 칭찬하더라. 나만 아는 너도 보고 싶어.",
    image: "/characters/esfj-yujin.png",
  },
  {
    id: "enfj-jaehyun",
    mbti: "ENFJ",
    gender: "남성",
    name: "재현",
    tagline: "네 꿈 응원하고 싶어. 내가 옆에서 제일 크게 박수칠게.",
    image: "/characters/enfj-jaehyun.png",
  },
  {
    id: "entj-seojun",
    mbti: "ENTJ",
    gender: "남성",
    name: "서준",
    tagline: "같이 성장하는 연애, 멀리 갈 수 있지 않을까?",
    image: "/characters/entj-seojun.png",
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}
