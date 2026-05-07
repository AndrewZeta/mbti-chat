"use client";

import { ChatBox } from "@/src/components/ChatBox";
import { useLanguage } from "@/src/components/LanguageProvider";
import type { ChatStyle } from "@/src/lib/chat-style";
import type { IdentityVariant } from "@/src/data/characters";

type CharacterChatClientProps = {
  characterName: { ko: string; en: string };
  characterMbti: string;
  characterHandle: string;
  characterImageSrc: string | null;
  characterGender?: string | null;
  characterDescription?: string | null;
  identityVariant?: IdentityVariant;
  chatStyle?: ChatStyle;
};

export function CharacterChatClient(props: CharacterChatClientProps) {
  const { language } = useLanguage();
  const localizedName = props.characterName[language];

  return <ChatBox {...props} characterName={localizedName} language={language} />;
}
