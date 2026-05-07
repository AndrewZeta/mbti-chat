"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  parseIdentityQueryParam,
  type IdentityVariant,
} from "@/src/data/characters";
import { parseChatStyleQueryParam, type ChatStyle } from "@/src/lib/chat-style";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getKoreanTopicParticle(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "야";
  const lastChar = trimmed[trimmed.length - 1];
  const code = lastChar.charCodeAt(0);

  if (code < 0xac00 || code > 0xd7a3) return "야";

  const hasBatchim = (code - 0xac00) % 28 !== 0;
  return hasBatchim ? "이야" : "야";
}

export type ChatBoxProps = {
  characterName: string;
  characterMbti: string;
  /** MBTI 옆에 표시할 핸들/아이디 (예: entj-seojun) */
  characterHandle: string;
  characterImageSrc: string | null;
  characterDescription?: string | null;
  characterBodyInfo?: { height?: string; weight?: string } | null;
  identityVariant?: IdentityVariant;
  chatStyle?: ChatStyle;
  fallbackHref?: string;
};

function BackChevronIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-current"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-900"
      aria-hidden
    >
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-900"
      aria-hidden
    >
      <path
        d="M23 7l-7 5 7 5V7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="5"
        width="15"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-900"
      aria-hidden
    >
      <path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-900"
      aria-hidden
    >
      <path
        d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-900"
      aria-hidden
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path
        d="M21 15l-5-5L5 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-900"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-current"
      aria-hidden
    >
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatBox({
  characterName,
  characterMbti,
  characterHandle,
  characterImageSrc,
  characterDescription,
  characterBodyInfo,
  identityVariant,
  chatStyle,
  fallbackHref = "/characters",
}: ChatBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const identityFromUrl = parseIdentityQueryParam(searchParams.get("identity"));
  const chatStyleFromUrl = parseChatStyleQueryParam(searchParams.get("style"));
  const effectiveIdentity: IdentityVariant = identityVariant ?? identityFromUrl;
  const introParticle = getKoreanTopicParticle(characterName);
  const effectiveChatStyle: ChatStyle = chatStyle ?? chatStyleFromUrl;
  const descriptionText = characterDescription?.trim() ?? "";
  const heightText = characterBodyInfo?.height?.trim() || "";
  const weightText = characterBodyInfo?.weight?.trim() || "";
  const hasHeightOrWeight = Boolean(heightText || weightText);
  const bodyInfoText =
    heightText || weightText
      ? `${heightText ? `${heightText}cm` : ""}${
          heightText && weightText ? " · " : ""
        }${weightText ? `${weightText}kg` : ""}`
      : "";
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text:
        effectiveIdentity === "A"
          ? `안녕, 나는 ${characterName}${introParticle}. 오늘은 차분하게 이야기 나눠보자.${
              descriptionText ? " 네 설정도 기억하고 안정적으로 맞춰갈게." : ""
            }`
          : effectiveIdentity === "T"
            ? `안녕, 나는 ${characterName}${introParticle}. 오늘은 무슨 얘기 하고 싶어? 네 마음을 놓치고 싶지 않아.${
                descriptionText ? " 네 설정도 조심스럽게 고려할게." : ""
              }`
            : `안녕, 나는 ${characterName}${introParticle}. 오늘은 무슨 얘기 하고 싶어?${
                descriptionText ? " 네 설정을 바탕으로 대화해볼게." : ""
              }`,
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const imageUnoptimized =
    characterImageSrc != null &&
    (characterImageSrc.startsWith("data:") ||
      characterImageSrc.startsWith("blob:"));

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const send = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: "user", text: trimmed },
      {
        id: createId(),
        role: "assistant",
        text:
          effectiveIdentity === "A"
            ? descriptionText
              ? "좋아, 네 마음을 이해했어. 네 설정까지 반영해서 안정적으로 풀어갈게."
              : "좋아, 네 마음을 이해했어. 우리는 안정적으로 풀어갈 수 있어."
            : effectiveIdentity === "T"
              ? descriptionText
                ? "그렇게 느꼈구나... 네 말이 계속 마음에 남아. 네 설정도 조심스럽게 고려할게. 조금 더 들려줄래?"
                : "그렇게 느꼈구나... 네 말이 계속 마음에 남아. 조금 더 들려줄래?"
              : "응답 테스트입니다",
      },
    ]);
  }, [effectiveIdentity, descriptionText, input]);

  const hasInput = input.trim().length > 0;
  const mbtiLabel = effectiveIdentity
    ? `${characterMbti}-${effectiveIdentity}`
    : characterMbti;
  const isKakao = effectiveChatStyle === "kakao";
  const isTiktok = effectiveChatStyle === "tiktok";

  const rootClass = isKakao
    ? "flex w-full min-h-0 flex-1 flex-col overflow-hidden bg-[#bacee0]"
    : isTiktok
      ? "flex w-full min-h-0 flex-1 flex-col overflow-hidden bg-black"
      : "flex w-full min-h-0 flex-1 flex-col overflow-hidden bg-white";
  const headerClass = isKakao
    ? "sticky top-0 z-20 flex shrink-0 items-center gap-2 border-b border-[#9fb4c8] bg-[#bacee0] px-2 py-2.5 pt-3 text-gray-900"
    : isTiktok
      ? "sticky top-0 z-20 flex shrink-0 items-center gap-2 border-b border-gray-800 bg-black px-2 py-2.5 pt-3 text-white"
      : "sticky top-0 z-20 flex shrink-0 items-center gap-2 border-b border-gray-100 bg-white px-2 py-2.5 pt-3 text-gray-900";
  const hoverClass = isTiktok ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const avatarFallbackClass = isTiktok
    ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-sm font-semibold text-white"
    : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-fuchsia-200 text-sm font-semibold text-purple-900";
  const messageAreaClass = isKakao
    ? "min-h-0 flex-1 space-y-2 overflow-y-auto bg-[#bacee0] px-3 py-3"
    : isTiktok
      ? "min-h-0 flex-1 space-y-2 overflow-y-auto bg-black px-3 py-3"
      : "min-h-0 flex-1 space-y-2 overflow-y-auto bg-white px-3 py-3";
  const userBubbleClass = isKakao
    ? "ml-auto max-w-[75%] rounded-2xl bg-[#fee500] px-4 py-2 text-sm text-gray-900"
    : isTiktok
      ? "ml-auto max-w-[75%] rounded-[18px] bg-[#fe2c55] px-4 py-2 text-sm text-white"
      : "ml-auto max-w-[75%] rounded-[22px] bg-gradient-to-br from-purple-500 to-fuchsia-600 px-4 py-2 text-sm text-white";
  const assistantBubbleClass = isKakao
    ? "mr-auto max-w-[75%] rounded-2xl bg-white px-4 py-2 text-sm text-gray-900"
    : isTiktok
      ? "mr-auto max-w-[75%] rounded-[18px] bg-[#1f1f1f] px-4 py-2 text-sm text-white"
      : "mr-auto max-w-[75%] rounded-[22px] bg-gray-100 px-4 py-2 text-sm text-gray-900";
  const inputBarClass = isKakao
    ? "sticky bottom-0 z-20 shrink-0 border-t border-[#9fb4c8] bg-white px-2 py-2 pb-4"
    : isTiktok
      ? "sticky bottom-0 z-20 shrink-0 border-t border-gray-800 bg-black px-2 py-2 pb-4 text-white"
      : "sticky bottom-0 z-20 shrink-0 border-t border-gray-100 bg-white px-2 py-2 pb-4";
  const inputWrapClass = isTiktok
    ? "flex min-w-0 flex-1 items-center rounded-full border border-gray-700 bg-[#121212] px-3 py-1"
    : "flex min-w-0 flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1";
  const inputClass = isTiktok
    ? "min-w-0 flex-1 bg-transparent py-2 text-[15px] text-white outline-none placeholder:text-gray-500"
    : "min-w-0 flex-1 bg-transparent py-2 text-[15px] text-gray-900 outline-none placeholder:text-gray-400";
  const sendButtonClass = isKakao
    ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fee500] text-gray-900 shadow-sm transition hover:opacity-90"
    : isTiktok
      ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fe2c55] text-white shadow-sm transition hover:opacity-90"
      : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-sm transition hover:opacity-90";

  return (
    <div className={rootClass}>
      <header className={headerClass}>
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push(fallbackHref);
            }
          }}
          className={`p-2 rounded-full transition ${hoverClass} ${
            isTiktok ? "bg-[#1f1f1f] text-white" : ""
          }`}
          aria-label="뒤로"
        >
          <BackChevronIcon />
        </button>

        {characterImageSrc ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
            <Image
              src={characterImageSrc}
              alt={characterName}
              fill
              className="object-cover"
              sizes="40px"
              unoptimized={imageUnoptimized}
            />
          </div>
        ) : (
          <div className={avatarFallbackClass}>
            {characterName.slice(0, 1)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className={`truncate text-[15px] font-semibold leading-tight ${isTiktok ? "text-white" : "text-gray-900"}`}>
            {characterName}
          </p>
          <p className={`truncate text-xs ${isTiktok ? "text-gray-400" : "text-gray-500"}`}>
            {mbtiLabel} · {characterHandle}
          </p>
          {bodyInfoText ? (
            <p className={`mt-0.5 truncate text-xs ${isTiktok ? "text-gray-500" : "text-gray-400"}`}>
              {bodyInfoText}
            </p>
          ) : null}
          {descriptionText ? (
            <p className={`mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap text-[11px] leading-relaxed ${isTiktok ? "text-gray-300" : "text-gray-600"}`}>
              {descriptionText}
            </p>
          ) : null}
        </div>

        {!isTiktok ? (
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full ${hoverClass}`}
              aria-label="음성 통화"
            >
              <PhoneIcon />
            </button>
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full ${hoverClass}`}
              aria-label="영상 통화"
            >
              <VideoIcon />
            </button>
          </div>
        ) : null}
      </header>

      <div
        ref={listRef}
        className={messageAreaClass}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={
                m.role === "user" ? userBubbleClass : assistantBubbleClass
              }
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className={inputBarClass}>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${hoverClass}`}
            aria-label="카메라"
          >
            <CameraIcon />
          </button>

          <div className={inputWrapClass}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Message..."
              className={inputClass}
              aria-label="메시지 입력"
            />
            <div className="flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-full ${isTiktok ? "hover:bg-gray-700/80" : "hover:bg-gray-200/80"}`}
                aria-label="마이크"
              >
                <MicIcon />
              </button>
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-full ${isTiktok ? "hover:bg-gray-700/80" : "hover:bg-gray-200/80"}`}
                aria-label="사진"
              >
                <ImageIcon />
              </button>
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-full ${isTiktok ? "hover:bg-gray-700/80" : "hover:bg-gray-200/80"}`}
                aria-label="이모지"
              >
                <EmojiIcon />
              </button>
            </div>
          </div>

          {hasInput ? (
            <button
              type="button"
              onClick={send}
              className={sendButtonClass}
              aria-label="전송"
            >
              <SendIcon />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
