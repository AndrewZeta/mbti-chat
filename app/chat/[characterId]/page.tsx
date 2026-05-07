import { notFound } from "next/navigation";
import { ChatBox } from "@/src/components/ChatBox";
import { getCharacterById, parseIdentityQueryParam } from "@/src/data/characters";
import { parseChatStyleQueryParam } from "@/src/lib/chat-style";

type Props = {
  params: Promise<{ characterId: string }>;
  searchParams: Promise<{ identity?: string; style?: string }>;
};

export default async function ChatPage({ params, searchParams }: Props) {
  const { characterId } = await params;
  const { identity, style } = await searchParams;
  const character = getCharacterById(characterId);
  if (!character) notFound();
  const identityVariant = parseIdentityQueryParam(identity ?? null);
  const chatStyle = parseChatStyleQueryParam(style ?? null);
  const outerBg =
    chatStyle === "kakao"
      ? "min-h-screen bg-[#a9bdce] md:bg-[#a9bdce]"
      : chatStyle === "tiktok"
        ? "min-h-screen bg-black md:bg-black"
        : "min-h-screen bg-white md:bg-[#f5f6f8]";
  const frameBg =
    chatStyle === "kakao"
      ? "bg-[#bacee0]"
      : chatStyle === "tiktok"
        ? "bg-black"
        : "bg-white";

  return (
    <div className={outerBg}>
      <div
        className={`mx-auto my-0 flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden ${frameBg} shadow-none md:my-8 md:min-h-[calc(100vh-4rem)] md:rounded-[36px] md:shadow-lg`}
      >
        <ChatBox
          characterName={character.name}
          characterMbti={character.mbti}
          characterHandle={character.id}
          characterImageSrc={character.image}
          identityVariant={identityVariant}
          chatStyle={chatStyle}
        />
      </div>
    </div>
  );
}
