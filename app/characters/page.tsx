"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { CompatibilityPanel } from "@/src/components/CompatibilityPanel";
import { CustomCharacterForm } from "@/src/components/CustomCharacterForm";
import { MbtiCharacterExplorer } from "@/src/components/MbtiCharacterExplorer";
import { characters } from "@/src/data/characters";

type CharactersTab = "chat" | "compatibility";

export default function CharactersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<CharactersTab>("chat");

  return (
    <div className="flex-1 bg-white dark:bg-zinc-950">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          }}
          className="p-2 rounded-full hover:bg-gray-100 transition text-xl dark:hover:bg-zinc-800"
          aria-label="뒤로"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-rose-950 dark:text-rose-50">
          캐릭터 선택
        </h1>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6">
        <section className="inline-flex items-center rounded-full border border-pink-100 bg-pink-50 p-1 dark:border-pink-900/40 dark:bg-zinc-900">
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeTab === "chat"
                ? "bg-white text-purple-600 font-semibold shadow-sm dark:bg-zinc-800 dark:text-purple-300"
                : "text-gray-500 hover:text-purple-500 dark:text-zinc-400 dark:hover:text-purple-300"
            }`}
          >
            채팅
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("compatibility")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeTab === "compatibility"
                ? "bg-white text-purple-600 font-semibold shadow-sm dark:bg-zinc-800 dark:text-purple-300"
                : "text-gray-500 hover:text-purple-500 dark:text-zinc-400 dark:hover:text-purple-300"
            }`}
          >
            궁합
          </button>
        </section>

        <div>
          <p className="text-sm text-rose-900/70 dark:text-rose-200/70">
            {activeTab === "chat"
              ? "나만의 캐릭터를 만들어 시작하거나, 아래 MBTI 책갈피에서 기본 프로필을 골라 대화해 보세요."
              : "내 MBTI와 상대 MBTI를 입력해 궁합 결과를 확인해 보세요."}
          </p>
        </div>

        {activeTab === "chat" ? (
          <>
            <CustomCharacterForm />

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-100">
                기본 MBTI 캐릭터
              </h2>
              <Suspense
                fallback={
                  <div className="flex min-h-[28rem] items-center justify-center rounded-3xl border border-pink-100/60 bg-white/80 text-sm text-gray-500 dark:border-pink-900/30 dark:bg-zinc-900/80 dark:text-zinc-400">
                    불러오는 중…
                  </div>
                }
              >
                <MbtiCharacterExplorer characters={characters} />
              </Suspense>
            </section>
          </>
        ) : (
          <CompatibilityPanel />
        )}
      </main>
    </div>
  );
}
