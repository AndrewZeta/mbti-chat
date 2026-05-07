"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  parseMbtiQueryParam,
  type Character,
  type IdentityVariant,
} from "@/src/data/characters";
import type { ChatStyle } from "@/src/lib/chat-style";
import {
  MbtiBookmarkTabsMobile,
  MbtiBookmarkTabsSidebar,
} from "@/src/components/MbtiBookmarkTabs";
import { SelectedCharacterImageCard } from "@/src/components/SelectedCharacterImageCard";

type Props = {
  characters: Character[];
};

export function MbtiCharacterExplorer({ characters }: Props) {
  const searchParams = useSearchParams();
  const mbtiFromUrl = searchParams.get("mbti");
  const [selectedMbti, setSelectedMbti] = useState("ISTJ");
  const [selectedIdentity, setSelectedIdentity] = useState<IdentityVariant>(null);
  const [chatStyle, setChatStyle] = useState<ChatStyle>("instagram");

  useEffect(() => {
    const valid = parseMbtiQueryParam(mbtiFromUrl);
    if (valid) {
      setSelectedMbti(valid);
      setSelectedIdentity(null);
    }
  }, [mbtiFromUrl]);

  const selected = useMemo(() => {
    return characters.find((c) => c.mbti === selectedMbti) ?? characters[0];
  }, [characters, selectedMbti]);

  return (
    <div>
      <div className="mb-5 md:hidden">
        <MbtiBookmarkTabsMobile
          selected={selectedMbti}
          onSelect={(mbti) => {
            setSelectedMbti(mbti);
            setSelectedIdentity(null);
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-stretch md:min-h-[700px]">
          <MbtiBookmarkTabsSidebar
            selected={selectedMbti}
            onSelect={(mbti) => {
              setSelectedMbti(mbti);
              setSelectedIdentity(null);
            }}
          />
          <main className="flex min-h-0 flex-1 items-stretch">
            <div className="flex h-full min-h-0 w-full items-center justify-center">
              <SelectedCharacterImageCard
                key={selected.id}
                character={selected}
                selectedIdentity={selectedIdentity}
                onSelectIdentity={setSelectedIdentity}
                chatStyle={chatStyle}
                onSelectChatStyle={setChatStyle}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
