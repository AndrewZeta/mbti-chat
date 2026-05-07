"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/src/components/LanguageProvider";
import type { Character, IdentityVariant } from "@/src/data/characters";
import type { ChatStyle } from "@/src/lib/chat-style";
import TEXT from "@/src/lib/text";

type Props = {
  character: Character;
  selectedIdentity: IdentityVariant;
  onSelectIdentity: (value: IdentityVariant) => void;
  chatStyle: ChatStyle;
  onSelectChatStyle: (value: ChatStyle) => void;
};

export function SelectedCharacterImageCard({
  character,
  selectedIdentity,
  onSelectIdentity,
  chatStyle,
  onSelectChatStyle,
}: Props) {
  const { language } = useLanguage();
  const t = TEXT[language];
  const localizedGender = character.gender === "남성" ? t.male : t.female;
  const localizedName = character.name[language];
  const params = new URLSearchParams();
  if (selectedIdentity) params.set("identity", selectedIdentity);
  params.set("style", chatStyle);
  const chatHref = `/chat/${character.id}${params.toString() ? `?${params.toString()}` : ""}`;

  const identityOptions: Array<{ value: IdentityVariant; label: string }> = [
    { value: null, label: t.identityNone },
    { value: "A", label: t.identityA },
    { value: "T", label: t.identityT },
  ];

  return (
    <article
      className="flex h-full w-full max-w-[1100px] min-h-[600px] flex-col items-center gap-8 rounded-3xl border border-pink-100 bg-white p-6 sm:p-10 md:flex-row md:items-center md:gap-16 dark:border-pink-900/40 dark:bg-zinc-900"
    >
      <div className="relative h-[400px] w-full max-w-[380px] shrink-0 overflow-hidden rounded-2xl bg-gray-100 md:h-[520px] md:w-[380px] md:max-w-none dark:bg-zinc-800">
        <Image
          src={character.image}
          alt={localizedName}
          fill
          className="rounded-2xl object-cover object-left"
          sizes="(max-width: 768px) 100vw, 380px"
          priority={character.mbti === "ISTJ"}
        />
      </div>

      <div className="flex w-full max-w-[520px] flex-1 flex-col justify-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {localizedName}
            </h3>
            <span className="rounded-full bg-gradient-to-r from-rose-100 to-violet-100 px-3 py-0.5 text-sm font-semibold text-violet-900 dark:from-rose-950 dark:to-violet-950 dark:text-violet-200">
              {character.mbti}
            </span>
            <span className="text-sm text-rose-800/80 dark:text-rose-200/70">
              {localizedGender}
            </span>
          </div>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {character.description[language]}
          </p>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.atOptionOptional}
          </p>
          <div className="flex flex-wrap gap-2">
            {identityOptions.map((option) => {
              const isSelected = selectedIdentity === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onSelectIdentity(option.value)}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    isSelected
                      ? "bg-purple-100 font-semibold text-purple-700 dark:bg-purple-900/50 dark:text-purple-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t.chatStyleSelect}
          </p>
          <div className="flex flex-wrap gap-2">
            {([
              { value: "instagram", label: t.instagramDm },
              { value: "kakao", label: t.kakao },
              { value: "tiktok", label: t.tiktokDm },
            ] as const).map((opt) => {
              const selected = chatStyle === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectChatStyle(opt.value)}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    selected
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <Link
          href={chatHref}
          className="mt-6 flex h-[56px] w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white transition hover:opacity-90 md:w-auto md:min-w-[240px] md:px-10"
        >
          {t.chatWithCharacter}
        </Link>
      </div>
    </article>
  );
}
