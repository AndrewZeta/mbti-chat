"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatBox } from "@/src/components/ChatBox";
import {
  CUSTOM_CHARACTER_STORAGE_KEY,
  type StoredCustomCharacter,
} from "@/src/lib/custom-character-storage";
import { parseIdentityQueryParam } from "@/src/data/characters";
import { parseChatStyleQueryParam } from "@/src/lib/chat-style";

export function CustomChatClient() {
  const searchParams = useSearchParams();
  const identityFromUrl = parseIdentityQueryParam(searchParams.get("identity"));
  const chatStyleFromUrl = parseChatStyleQueryParam(searchParams.get("style"));
  const nameFromUrl = searchParams.get("name")?.trim() ?? "";
  const mbtiFromUrl = (searchParams.get("mbti") ?? "").trim();
  const outerBg =
    chatStyleFromUrl === "kakao"
      ? "min-h-screen bg-[#a9bdce] md:bg-[#a9bdce]"
      : chatStyleFromUrl === "tiktok"
        ? "min-h-screen bg-black md:bg-black"
        : "min-h-screen bg-white md:bg-[#f5f6f8]";
  const frameBg =
    chatStyleFromUrl === "kakao"
      ? "bg-[#bacee0]"
      : chatStyleFromUrl === "tiktok"
        ? "bg-black"
        : "bg-white";
  const [data, setData] = useState<StoredCustomCharacter | null | undefined>(
    undefined,
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_CHARACTER_STORAGE_KEY);
      if (!raw) {
        setData(null);
        return;
      }
      setData(JSON.parse(raw) as StoredCustomCharacter);
    } catch {
      setData(null);
    }
  }, []);

  if (data === undefined) {
    return (
      <div className={outerBg}>
        <div className={`mx-auto my-0 flex min-h-screen w-full max-w-[430px] items-center justify-center ${frameBg} text-sm ${chatStyleFromUrl === "tiktok" ? "text-gray-300" : "text-gray-500"} shadow-none md:my-8 md:min-h-[calc(100vh-4rem)] md:rounded-[36px] md:shadow-lg`}>
          불러오는 중…
        </div>
      </div>
    );
  }

  if (!data || !data.name?.trim()) {
    if (nameFromUrl && mbtiFromUrl) {
      return (
        <div className={outerBg}>
          <div className={`mx-auto my-0 flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden ${frameBg} shadow-none md:my-8 md:min-h-[calc(100vh-4rem)] md:rounded-[36px] md:shadow-lg`}>
            <ChatBox
              characterName={nameFromUrl}
              characterMbti={mbtiFromUrl}
              characterHandle="custom"
              characterImageSrc={null}
              characterDescription={null}
              characterBodyInfo={null}
              identityVariant={identityFromUrl}
              chatStyle={chatStyleFromUrl}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={outerBg}>
        <div className={`mx-auto my-0 flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center gap-4 ${frameBg} px-6 text-center shadow-none md:my-8 md:min-h-[calc(100vh-4rem)] md:rounded-[36px] md:shadow-lg`}>
          <p className={chatStyleFromUrl === "tiktok" ? "text-gray-300" : "text-gray-600"}>
            캐릭터 정보가 없어요. 캐릭터 선택에서 프로필을 만든 뒤 다시 시도해 주세요.
          </p>
          <Link
            href="/characters"
            className="rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white"
          >
            캐릭터 선택으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={outerBg}>
      <div className={`mx-auto my-0 flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden ${frameBg} shadow-none md:my-8 md:min-h-[calc(100vh-4rem)] md:rounded-[36px] md:shadow-lg`}>
        <ChatBox
          characterName={data.name}
          characterMbti={data.mbti}
          characterHandle="custom"
          characterImageSrc={data.imagePreviewUrl}
          characterDescription={data.description}
          characterBodyInfo={{
            height: data.height,
            weight: data.weight,
          }}
          identityVariant={identityFromUrl ?? data.identity ?? null}
          chatStyle={chatStyleFromUrl ?? data.chatStyle ?? "instagram"}
        />
      </div>
    </div>
  );
}
