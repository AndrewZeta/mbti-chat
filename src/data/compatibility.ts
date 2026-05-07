export type MbtiType =
  | "INFP"
  | "ENFP"
  | "INFJ"
  | "ENFJ"
  | "INTJ"
  | "ENTJ"
  | "INTP"
  | "ENTP"
  | "ISFP"
  | "ESFP"
  | "ISTP"
  | "ESTP"
  | "ISFJ"
  | "ESFJ"
  | "ISTJ"
  | "ESTJ";

export type CompatibilityGrade =
  | "legend"
  | "great"
  | "normal"
  | "danger"
  | "worst";

export type CompatibilityResult = {
  pair: string;
  score: number;
  grade: CompatibilityGrade;
  title: { ko: string; en: string };
  subtitle: { ko: string; en: string };
  summary: { ko: string; en: string };
  trust: number;
  communication: number;
  responsibility: number;
  humor: number;
  myLoveStyle: {
    title: { ko: string; en: string };
    points: { ko: string[]; en: string[] };
  };
  partnerLoveStyle: {
    title: { ko: string; en: string };
    points: { ko: string[]; en: string[] };
  };
};

export const mbtiTypes: MbtiType[] = [
  "INFP",
  "ENFP",
  "INFJ",
  "ENFJ",
  "INTJ",
  "ENTJ",
  "INTP",
  "ENTP",
  "ISFP",
  "ESFP",
  "ISTP",
  "ESTP",
  "ISFJ",
  "ESFJ",
  "ISTJ",
  "ESTJ",
];

const resultCopyByGrade: Record<
  CompatibilityGrade,
  Pick<CompatibilityResult, "title" | "subtitle" | "summary">
> = {
  legend: {
    title: { ko: "찰떡궁합", en: "Perfect Match" },
    subtitle: {
      ko: "타올랐다 사라지지 않는 강력한 끌림",
      en: "A powerful attraction that flares up and stays strong",
    },
    summary: {
      ko: "서로의 매력이 빠르게 폭발하는 조합입니다. 감정, 대화, 생활 리듬이 잘 맞아 연애 초반부터 강한 몰입감을 만들 수 있어요.",
      en: "Your chemistry sparks quickly. Emotions, communication, and daily rhythm align well, creating strong romantic immersion from the start.",
    },
  },
  great: {
    title: { ko: "천생연분에 가까운 관계", en: "A Near Soulmate Pairing" },
    subtitle: {
      ko: "서로를 자연스럽게 끌어올리는 궁합",
      en: "A match that naturally lifts each other up",
    },
    summary: {
      ko: "큰 노력 없이도 서로의 장점을 알아봐 주는 관계입니다. 대화가 편하고, 함께 있을 때 안정감과 설렘이 함께 생길 수 있어요.",
      en: "You notice each other's strengths without much effort. Conversation feels easy, and being together brings both comfort and excitement.",
    },
  },
  normal: {
    title: { ko: "안 맞는 듯 맞는 관계", en: "Different, Yet Compatible" },
    subtitle: {
      ko: "다름이 매력이 될 수 있는 조합",
      en: "A pair where differences can become charm",
    },
    summary: {
      ko: "처음에는 성향 차이가 느껴질 수 있지만, 서로의 방식을 이해하면 오히려 균형 잡힌 관계가 될 수 있어요.",
      en: "At first, your differences may stand out. But with mutual understanding, those differences can create a balanced relationship.",
    },
  },
  danger: {
    title: { ko: "작은 다툼 주의보", en: "Watch for Friction" },
    subtitle: {
      ko: "끌림은 있지만 조율이 필요한 관계",
      en: "Attraction exists, but alignment is needed",
    },
    summary: {
      ko: "서로에게 매력을 느낄 수 있지만, 표현 방식과 기대치가 달라 오해가 생기기 쉬운 조합입니다.",
      en: "You can feel attracted to each other, but differences in expression and expectations can lead to misunderstandings.",
    },
  },
  worst: {
    title: { ko: "지구 멸망의 길", en: "High-Risk Match" },
    subtitle: {
      ko: "강한 끌림 뒤에 큰 충돌이 올 수 있는 궁합",
      en: "Strong attraction may be followed by major conflicts",
    },
    summary: {
      ko: "서로의 방식이 너무 달라 피로감이 쌓이기 쉬운 관계입니다. 감정 표현, 생활 방식, 책임감의 기준을 반드시 맞춰야 해요.",
      en: "Your styles are very different, so emotional fatigue can build up quickly. You need clear alignment on emotional expression, lifestyle, and responsibility.",
    },
  },
};

export const mbtiLoveStyleTitles: Record<
  MbtiType,
  { ko: string; en: string }
> = {
  INFP: {
    ko: "감성 깊은 이상주의자 연애 스타일",
    en: "romantic style: deep and idealistic",
  },
  ENFP: {
    ko: "밝고 자유로운 댕댕이 연애 스타일",
    en: "romantic style: bright and free-spirited",
  },
  INFJ: {
    ko: "깊은 관계를 원하는 진심형 연애 스타일",
    en: "romantic style: sincere and depth-seeking",
  },
  ENFJ: {
    ko: "상대를 성장시키는 리더형 연애 스타일",
    en: "romantic style: growth-oriented leader",
  },
  INTJ: {
    ko: "미래를 설계하는 전략가 연애 스타일",
    en: "romantic style: future-planning strategist",
  },
  ENTJ: {
    ko: "확신 있게 이끄는 승부사 연애 스타일",
    en: "romantic style: confident and driven",
  },
  INTP: {
    ko: "호기심 많은 분석가 연애 스타일",
    en: "romantic style: curious analyst",
  },
  ENTP: {
    ko: "말맛과 자극을 즐기는 토론가 연애 스타일",
    en: "romantic style: witty debater",
  },
  ISFP: {
    ko: "잔잔하게 스며드는 감성가 연애 스타일",
    en: "romantic style: gentle and artistic",
  },
  ESFP: {
    ko: "지금 이 순간을 즐기는 애교형 연애 스타일",
    en: "romantic style: playful in-the-moment",
  },
  ISTP: {
    ko: "말보다 행동으로 보여주는 실용가 연애 스타일",
    en: "romantic style: practical actions over words",
  },
  ESTP: {
    ko: "직진하는 에너지형 연애 스타일",
    en: "romantic style: direct and energetic",
  },
  ISFJ: {
    ko: "조용히 챙겨주는 헌신형 연애 스타일",
    en: "romantic style: quietly devoted",
  },
  ESFJ: {
    ko: "따뜻하게 분위기를 만드는 다정형 연애 스타일",
    en: "romantic style: warm and caring",
  },
  ISTJ: {
    ko: "신뢰를 쌓아가는 책임형 연애 스타일",
    en: "romantic style: responsible and reliable",
  },
  ESTJ: {
    ko: "든든하게 이끄는 현실형 연애 스타일",
    en: "romantic style: grounded and dependable",
  },
};

const mbtiLoveStyleTemplatesKo: Record<MbtiType, string[]> = {
  INFP: [
    "감정의 결을 세심하게 읽고 관계의 의미를 깊게 생각해요.",
    "확신이 생기면 오래 가는 헌신형 연애를 해요.",
    "진심 없는 표현에 쉽게 마음이 식을 수 있어요.",
    "둘만의 서사와 추억을 소중히 쌓아가요.",
  ],
  ENFP: [
    "설렘을 표현하는 데 망설임이 적고 분위기를 밝게 만들어요.",
    "상대의 가능성을 믿고 크게 응원해 주는 편이에요.",
    "답답한 침묵보다 솔직한 대화를 선호해요.",
    "새로운 데이트와 경험에서 애정이 커져요.",
  ],
  INFJ: [
    "관계를 신중히 시작하지만 시작하면 깊이 몰입해요.",
    "상대의 감정 변화를 빠르게 감지하고 배려해요.",
    "가치관이 맞는지 중요하게 보는 편이에요.",
    "신뢰가 쌓일수록 단단하고 안정적인 연애를 해요.",
  ],
  ENFJ: [
    "상대가 더 빛나게 만드는 서포트에 강해요.",
    "갈등이 생기면 대화로 풀어가려는 의지가 커요.",
    "서로 성장하는 관계를 가장 이상적으로 생각해요.",
    "애정 표현을 적극적으로 하며 분위기를 이끌어요.",
  ],
  INTJ: [
    "감정보다 일관성과 신뢰를 먼저 확인해요.",
    "마음이 열리면 계획적인 배려를 꾸준히 보여줘요.",
    "불필요한 밀당보다 명확한 합의를 선호해요.",
    "각자의 목표를 존중하는 관계에서 안정감을 느껴요.",
  ],
  ENTJ: [
    "관계를 리드하며 현실적인 해결책을 잘 제시해요.",
    "함께 성장하는 목표형 연애를 선호해요.",
    "감정 소모가 큰 상황에서는 직설적으로 반응할 수 있어요.",
    "신뢰가 형성되면 책임감 있게 관계를 지켜요.",
  ],
  INTP: [
    "느리지만 깊이 이해하는 방식으로 애정을 표현해요.",
    "논리적 대화를 통해 마음이 열리는 편이에요.",
    "감정 표현이 적어 오해를 살 수 있지만 진심은 깊어요.",
    "서로의 개인 시간을 존중할 때 관계가 편안해져요.",
  ],
  ENTP: [
    "유쾌한 대화와 장난으로 친밀감을 빠르게 만들어요.",
    "새로운 시도와 자극이 있는 관계를 좋아해요.",
    "의견 충돌도 토론처럼 풀어가는 편이에요.",
    "지루함이 길어지면 거리감이 생길 수 있어요.",
  ],
  ISFP: [
    "말보다 행동으로 다정함을 보여주는 편이에요.",
    "관계의 분위기와 감정적 안정감을 중요하게 봐요.",
    "압박 없는 편안한 소통에서 매력이 커져요.",
    "작은 일상의 행복을 함께 만드는 데 강해요.",
  ],
  ESFP: [
    "따뜻한 리액션으로 상대를 기분 좋게 만들어요.",
    "함께 즐기는 순간이 많을수록 애정이 커져요.",
    "즉각적인 피드백과 표현을 선호해요.",
    "현실적인 규칙보다 감정의 흐름을 따르는 편이에요.",
  ],
  ISTP: [
    "담백하지만 필요할 때 확실히 챙겨주는 스타일이에요.",
    "과한 감정 압박보다 편한 거리감을 선호해요.",
    "실용적인 도움과 행동으로 신뢰를 쌓아요.",
    "자유를 존중받을 때 관계 만족도가 높아져요.",
  ],
  ESTP: [
    "직진형 표현으로 관계의 속도를 빠르게 올려요.",
    "현실 문제를 빠르게 해결하며 추진력이 좋아요.",
    "즉흥적인 즐거움이 많을수록 친밀감이 커져요.",
    "세밀한 감정 조율에는 다소 둔감할 수 있어요.",
  ],
  ISFJ: [
    "꾸준한 배려와 책임감으로 안정감을 만들어요.",
    "상대의 생활 리듬을 맞추는 데 능숙해요.",
    "갈등을 크게 만들기보다 조용히 조율하려 해요.",
    "고마움을 표현받을 때 마음이 더 단단해져요.",
  ],
  ESFJ: [
    "정서적 교류와 일상 공유를 매우 중요하게 생각해요.",
    "상대를 챙기고 돌보는 데 진심인 편이에요.",
    "관계가 소홀해 보이면 불안감을 느끼기 쉬워요.",
    "따뜻한 피드백이 많을수록 애정이 깊어져요.",
  ],
  ISTJ: [
    "신중하게 시작하고 오래 지키는 관계를 선호해요.",
    "약속과 책임을 매우 중요하게 생각해요.",
    "감정 표현은 적어도 행동의 일관성이 높아요.",
    "예측 가능한 안정된 관계에서 편안함을 느껴요.",
  ],
  ESTJ: [
    "관계를 현실적으로 이끌며 기준을 명확히 세워요.",
    "문제가 생기면 빠르게 정리하고 해결하려 해요.",
    "서로의 역할과 책임이 분명할 때 만족도가 높아요.",
    "감정 위로보다 실질적인 도움을 먼저 주는 편이에요.",
  ],
};

const mbtiLoveStyleTemplatesEn: Record<MbtiType, string[]> = {
  INFP: [
    "Reads emotional nuance carefully and values meaning in relationships.",
    "Once committed, tends to stay deeply devoted.",
    "Can lose interest when affection feels insincere.",
    "Loves building a unique shared story together.",
  ],
  ENFP: [
    "Expresses excitement openly and brightens the mood fast.",
    "Actively cheers for a partner's potential and growth.",
    "Prefers honest conversation over awkward silence.",
    "Feels more connected through new dates and experiences.",
  ],
  INFJ: [
    "Starts carefully, but commits with depth once in.",
    "Quickly notices emotional shifts and responds with care.",
    "Cares strongly about value alignment in love.",
    "Becomes steady and secure as trust accumulates.",
  ],
  ENFJ: [
    "Naturally supports a partner to shine brighter.",
    "Tries to resolve conflict through dialogue.",
    "Prefers relationships where both people grow.",
    "Shows affection proactively and leads the vibe.",
  ],
  INTJ: [
    "Checks consistency and reliability before emotions.",
    "Shows thoughtful, planned care once trust is built.",
    "Prefers clear agreements over emotional games.",
    "Feels stable when goals and independence are respected.",
  ],
  ENTJ: [
    "Tends to lead with practical solutions in relationships.",
    "Likes goal-oriented relationships that grow forward.",
    "May sound blunt under heavy emotional friction.",
    "Protects the relationship responsibly after trust forms.",
  ],
  INTP: [
    "Shows affection through deep understanding over time.",
    "Opens up emotionally through logical conversation.",
    "May seem reserved, but feelings run deep.",
    "Relationship feels best with mutual personal space.",
  ],
  ENTP: [
    "Builds closeness quickly through playful conversation.",
    "Enjoys relationships with novelty and stimulation.",
    "Handles disagreement like constructive debate.",
    "Can feel distant if things stay monotonous too long.",
  ],
  ISFP: [
    "Shows care quietly through actions more than words.",
    "Values emotional comfort and atmosphere in love.",
    "Shines most in low-pressure, gentle communication.",
    "Good at creating happiness in everyday moments.",
  ],
  ESFP: [
    "Uses warm reactions to make a partner feel good.",
    "Affection grows through shared fun in the moment.",
    "Prefers immediate feedback and clear expression.",
    "Follows emotional flow more than strict rules.",
  ],
  ISTP: [
    "Calm but dependable when it truly matters.",
    "Prefers comfortable space over emotional pressure.",
    "Builds trust through practical help and action.",
    "Relationship satisfaction rises when freedom is respected.",
  ],
  ESTP: [
    "Direct expression speeds up relationship momentum.",
    "Strong execution in handling real-life issues.",
    "Spontaneous fun increases closeness quickly.",
    "Can be less sensitive in fine emotional tuning.",
  ],
  ISFJ: [
    "Creates stability through steady care and responsibility.",
    "Good at matching a partner's daily rhythm.",
    "Prefers quiet coordination over dramatic conflict.",
    "Feels more secure when appreciation is expressed.",
  ],
  ESFJ: [
    "Values emotional exchange and daily sharing highly.",
    "Sincerely caring and attentive to a partner.",
    "Can feel anxious when the relationship seems neglected.",
    "Affection deepens with warm, frequent feedback.",
  ],
  ISTJ: [
    "Prefers careful starts and long-term commitment.",
    "Takes promises and responsibility very seriously.",
    "Less expressive, but highly consistent in action.",
    "Feels comfortable in stable and predictable relationships.",
  ],
  ESTJ: [
    "Leads realistically with clear standards.",
    "Moves quickly to organize and solve problems.",
    "Most satisfied when roles and responsibility are clear.",
    "Offers practical help before emotional soothing.",
  ],
};

const mbtiLoveStyleTemplates: Record<MbtiType, { ko: string[]; en: string[] }> =
  mbtiTypes.reduce((acc, mbti) => {
    acc[mbti] = {
      ko: mbtiLoveStyleTemplatesKo[mbti],
      en: mbtiLoveStyleTemplatesEn[mbti],
    };
    return acc;
  }, {} as Record<MbtiType, { ko: string[]; en: string[] }>);

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function sortedPairKey(a: MbtiType, b: MbtiType) {
  return [a, b].sort().join("-");
}

function seedFromPair(a: MbtiType, b: MbtiType) {
  return sortedPairKey(a, b)
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function deterministicRange(seed: number, min: number, max: number) {
  const span = max - min + 1;
  return min + (seed % span);
}

function letterDiffCount(a: MbtiType, b: MbtiType) {
  let diff = 0;
  for (let i = 0; i < 4; i += 1) {
    if (a[i] !== b[i]) diff += 1;
  }
  return diff;
}

function baseGradeScore(grade: CompatibilityGrade) {
  switch (grade) {
    case "legend":
      return 32;
    case "great":
      return 23;
    case "normal":
      return 14;
    case "danger":
      return 7;
    case "worst":
      return 0;
    default:
      return 14;
  }
}

function getScoreRangeByGrade(grade: CompatibilityGrade) {
  switch (grade) {
    case "legend":
      return [85, 96] as const;
    case "great":
      return [72, 84] as const;
    case "normal":
      return [55, 71] as const;
    case "danger":
      return [40, 54] as const;
    case "worst":
      return [25, 39] as const;
    default:
      return [55, 71] as const;
  }
}

function gradeForPair(a: MbtiType, b: MbtiType): CompatibilityGrade {
  const same = a === b;
  const sameNS = a[1] === b[1];
  const bothN = a[1] === "N" && b[1] === "N";
  const bothS = a[1] === "S" && b[1] === "S";
  const bothSJ = a[1] === "S" && a[3] === "J" && b[1] === "S" && b[3] === "J";
  const bothSP = a[1] === "S" && a[3] === "P" && b[1] === "S" && b[3] === "P";
  const sameTF = a[2] === b[2];
  const sameJP = a[3] === b[3];
  const diffCount = letterDiffCount(a, b);

  // NF/NT/N계열끼리 좋은 편
  if (bothN && sameJP && sameTF) return "legend";
  if (bothN && sameJP) return "great";
  if (bothN && sameTF) return "great";
  if (bothN && diffCount <= 2) return "great";

  // 같은 MBTI는 great/normal
  if (same) {
    if (a[1] === "N") return "great";
    return "normal";
  }

  // SJ 안정궁합 / SP 재미궁합
  if (bothSJ && sameTF) return "great";
  if (bothSJ) return "normal";
  if (bothSP && sameTF) return "great";
  if (bothSP) return "normal";

  // N/S 큰 차이 + J/P,T/F도 어긋나면 낮은 궁합
  if (!sameNS && !sameJP && !sameTF) return "worst";
  if (!sameNS && diffCount >= 3) return "danger";
  if (!sameNS && !sameJP) return "danger";

  // 나머지는 보통
  if (sameJP || sameTF) return "normal";
  return "danger";
}

function buildRow(myType: MbtiType): Record<MbtiType, CompatibilityGrade> {
  const row = {} as Record<MbtiType, CompatibilityGrade>;
  for (const partner of mbtiTypes) {
    row[partner] = gradeForPair(myType, partner);
  }
  return row;
}

export const compatibilityMatrix: Record<MbtiType, Record<MbtiType, CompatibilityGrade>> =
  mbtiTypes.reduce((acc, type) => {
    acc[type] = buildRow(type);
    return acc;
  }, {} as Record<MbtiType, Record<MbtiType, CompatibilityGrade>>);

function metricSeed(
  myMbti: MbtiType,
  partnerMbti: MbtiType,
  channel: "trust" | "communication" | "responsibility" | "humor",
) {
  const base = seedFromPair(myMbti, partnerMbti);
  const offsets = {
    trust: 11,
    communication: 23,
    responsibility: 37,
    humor: 53,
  } as const;
  return base + offsets[channel];
}

function buildMetrics(
  myMbti: MbtiType,
  partnerMbti: MbtiType,
  grade: CompatibilityGrade,
) {
  const sameEI = myMbti[0] === partnerMbti[0];
  const sameTF = myMbti[2] === partnerMbti[2];
  const sameJP = myMbti[3] === partnerMbti[3];
  const bothP = myMbti[3] === "P" && partnerMbti[3] === "P";
  const bothE = myMbti[0] === "E" && partnerMbti[0] === "E";

  const base = baseGradeScore(grade) + 46; // 46~78 베이스

  const trust =
    base +
    (sameTF ? 14 : -8) +
    deterministicRange(metricSeed(myMbti, partnerMbti, "trust"), -6, 6);

  const communication =
    base +
    (sameEI ? 12 : -5) +
    deterministicRange(metricSeed(myMbti, partnerMbti, "communication"), -7, 7);

  const responsibility =
    base +
    (sameJP ? 15 : -14) +
    deterministicRange(metricSeed(myMbti, partnerMbti, "responsibility"), -8, 8);

  const humor =
    base +
    (bothP ? 11 : 0) +
    (bothE ? 8 : 0) +
    deterministicRange(metricSeed(myMbti, partnerMbti, "humor"), -8, 8);

  return {
    trust: clamp(trust, 0, 100),
    communication: clamp(communication, 0, 100),
    responsibility: clamp(responsibility, 0, 100),
    humor: clamp(humor, 0, 100),
  };
}

export function getCompatibility(
  myMbti: MbtiType,
  partnerMbti: MbtiType,
): CompatibilityResult {
  const grade = compatibilityMatrix[myMbti][partnerMbti];
  const [minScore, maxScore] = getScoreRangeByGrade(grade);
  const pairSeed = seedFromPair(myMbti, partnerMbti);
  const score = deterministicRange(pairSeed, minScore, maxScore);
  const copy = resultCopyByGrade[grade];
  const metrics = buildMetrics(myMbti, partnerMbti, grade);

  return {
    pair: `${myMbti}-${partnerMbti}`,
    score,
    grade,
    title: copy.title,
    subtitle: copy.subtitle,
    summary: copy.summary,
    trust: metrics.trust,
    communication: metrics.communication,
    responsibility: metrics.responsibility,
    humor: metrics.humor,
    myLoveStyle: {
      title: {
        ko: `나는 ${mbtiLoveStyleTitles[myMbti].ko}`,
        en: `My ${mbtiLoveStyleTitles[myMbti].en}`,
      },
      points: mbtiLoveStyleTemplates[myMbti],
    },
    partnerLoveStyle: {
      title: {
        ko: `상대는 ${mbtiLoveStyleTitles[partnerMbti].ko}`,
        en: `Partner's ${mbtiLoveStyleTitles[partnerMbti].en}`,
      },
      points: mbtiLoveStyleTemplates[partnerMbti],
    },
  };
}

