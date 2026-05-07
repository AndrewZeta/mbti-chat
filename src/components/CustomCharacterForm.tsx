"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CUSTOM_CHARACTER_STORAGE_KEY,
  type StoredCustomCharacter,
} from "@/src/lib/custom-character-storage";
import type { IdentityVariant } from "@/src/data/characters";
import { MBTI_TYPES } from "@/src/data/characters";
import type { ChatStyle } from "@/src/lib/chat-style";
import { useLanguage } from "@/src/components/LanguageProvider";
import TEXT from "@/src/lib/text";

export function CustomCharacterForm() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = TEXT[language];
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState<string>(MBTI_TYPES[0]);
  const [identity, setIdentity] = useState<IdentityVariant>(null);
  const [gender, setGender] = useState<"female" | "male">("female");
  const [customDescription, setCustomDescription] = useState("");
  const [chatStyle, setChatStyle] = useState<ChatStyle>("instagram");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const revokePreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0] ?? null;
    revokePreview();
    setFile(next);
    if (next) {
      const url = URL.createObjectURL(next);
      previewUrlRef.current = url;
      setPreviewUrl(url);
    }
  };

  const start = () => {
    const trimmedName = name.trim();
    const trimmedDescription = customDescription.trim();
    if (!trimmedName) {
      alert(language === "en" ? "Please enter a name." : "이름을 입력해 주세요.");
      return;
    }

    const finish = (imageDataUrl: string | null) => {
      const payload: StoredCustomCharacter = {
        name: trimmedName,
        mbti,
        identity,
        chatStyle,
        gender: gender === "male" ? t.male : t.female,
        description: trimmedDescription,
        height,
        weight,
        imagePreviewUrl: imageDataUrl,
      };
      localStorage.setItem(CUSTOM_CHARACTER_STORAGE_KEY, JSON.stringify(payload));
      router.push(
        `/chat/custom?name=${encodeURIComponent(trimmedName)}&mbti=${encodeURIComponent(
          mbti,
        )}&identity=${encodeURIComponent(identity ?? "")}&style=${encodeURIComponent(
          chatStyle,
        )}`,
      );
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        finish(typeof reader.result === "string" ? reader.result : null);
      };
      reader.onerror = () => finish(null);
      reader.readAsDataURL(file);
      return;
    }

    finish(null);
  };

  return (
    <section className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-50 via-white to-violet-50 p-5 shadow-md shadow-rose-100/50 dark:border-rose-900/40 dark:from-rose-950/40 dark:via-zinc-900 dark:to-violet-950/40 dark:shadow-none sm:p-6">
      <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-100">
        {t.customCharacterCreate}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-rose-900/70 dark:text-rose-200/70">
        {t.customCharacterDesc}
      </p>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center gap-2 sm:w-40">
          <label className="relative flex h-36 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-rose-200 bg-white/80 text-center text-xs text-rose-600/80 dark:border-rose-800 dark:bg-zinc-950/50 dark:text-rose-300/80">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={onFileChange}
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={t.preview}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="px-2">{t.selectPhoto}</span>
            )}
          </label>
          <span className="text-xs text-rose-800/60 dark:text-rose-200/50">
            {t.imageFormats}
          </span>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 1. 이름 */}
          <label className="block text-sm font-medium text-rose-950 dark:text-rose-100">
            {t.name}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.characterName}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-zinc-900 outline-none ring-rose-300/40 placeholder:text-zinc-400 focus:border-rose-400 focus:ring-2 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </label>

          {/* 2. MBTI (+ A/T) */}
          <label className="block text-sm font-medium text-rose-950 dark:text-rose-100">
            {t.mbti}
            <select
              value={mbti}
              onChange={(e) => setMbti(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-300/40 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
            >
              {MBTI_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="mt-2 flex flex-wrap gap-2">
              {([
                { value: null, label: t.identityNone },
                { value: "A", label: t.identityA },
                { value: "T", label: t.identityT },
              ] as const).map((opt) => {
                const selected = identity === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => setIdentity(opt.value)}
                    className={`px-3 py-1 rounded-full border text-sm transition hover:bg-purple-50 dark:hover:bg-purple-950/40 ${
                      selected
                        ? "bg-purple-500 text-white border-purple-500"
                        : "border-rose-200 text-rose-900/80 bg-white dark:border-rose-900 dark:bg-zinc-950 dark:text-rose-100/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </label>

          {/* 3. 키/몸무게 */}
          <div className="sm:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="number"
                placeholder={t.heightCm}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-100 dark:border-gray-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
              <input
                type="number"
                placeholder={t.weightKg}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-100 dark:border-gray-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
            </div>
          </div>

          {/* 4. 성별 */}
          <label className="block text-sm font-medium text-rose-950 dark:text-rose-100">
            {t.gender}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "female" | "male")}
              className="mt-1.5 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-300/40 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
            >
              <option value="female">{t.female}</option>
              <option value="male">{t.male}</option>
            </select>
          </label>

          {/* 5. 커스텀 인물 설명 */}
          <label className="block text-sm font-medium text-rose-950 dark:text-rose-100 sm:col-span-2">
            {t.customDescriptionLabel}
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder={t.customDescriptionPlaceholder}
              className="
                mt-1.5
                w-full
                min-h-[120px]
                max-h-[260px]
                resize-y
                overflow-y-auto
                rounded-2xl
                border
                border-gray-200
                px-4
                py-3
                text-sm
                leading-relaxed
                outline-none
                focus:border-purple-400
                focus:ring-2
                focus:ring-purple-100
                dark:border-gray-800
                dark:bg-zinc-950
                dark:text-zinc-50
              "
            />
          </label>

          <div className="sm:col-span-2">
            <p className="mb-2 text-sm font-medium text-rose-950 dark:text-rose-100">
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
                    onClick={() => setChatStyle(opt.value)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      selected
                        ? "bg-purple-500 text-white"
                        : "bg-white text-rose-900/80 border border-rose-200 hover:bg-purple-50 dark:border-rose-900 dark:bg-zinc-950 dark:text-rose-100/80 dark:hover:bg-purple-950/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={start}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-rose-300/40 transition hover:from-rose-600 hover:to-violet-700 sm:text-base"
      >
        {t.startWithCustom}
      </button>
    </section>
  );
}
