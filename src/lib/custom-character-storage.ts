// 긴 설명은 URL로 넘기지 않고 localStorage에 저장합니다.
export const CUSTOM_CHARACTER_STORAGE_KEY = "customCharacter";

export type StoredCustomCharacter = {
  name: string;
  mbti: string;
  identity: "A" | "T" | null;
  chatStyle: "instagram" | "kakao" | "tiktok";
  gender: string;
  description: string;
  height: string;
  weight: string;
  imagePreviewUrl: string | null;
};
