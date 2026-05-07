export type ChatStyle = "instagram" | "kakao" | "tiktok";

const CHAT_STYLE_SET = new Set<string>(["instagram", "kakao", "tiktok"]);

export function parseChatStyleQueryParam(value: string | null): ChatStyle {
  if (!value) return "instagram";
  const lower = value.trim().toLowerCase();
  return CHAT_STYLE_SET.has(lower) ? (lower as ChatStyle) : "instagram";
}

