"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/src/components/LanguageProvider";
import { LandingChatPreview } from "@/src/components/landing/LandingChatPreview";
import { getCharacterById } from "@/src/data/characters";
import TEXT from "@/src/lib/text";

const PREVIEW_IDS = ["entj-seojun", "enfp-haerin", "istp-doyun"] as const;

function CtaButton({
  className = "",
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <Link
      href="/characters"
      className={`inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white shadow-md shadow-pink-200/40 transition hover:opacity-95 dark:shadow-none ${className}`}
    >
      {label}
    </Link>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const t = TEXT[language];
  const features = [
    { title: t.landingFeature1Title, body: t.landingFeature1Body },
    { title: t.landingFeature2Title, body: t.landingFeature2Body },
    { title: t.landingFeature3Title, body: t.landingFeature3Body },
  ];
  const previewCopy = {
    "entj-seojun": {
      name: t.landingPreviewSeojunName,
      line: t.landingPreviewSeojunLine,
    },
    "enfp-haerin": {
      name: t.landingPreviewHaerinName,
      line: t.landingPreviewHaerinLine,
    },
    "istp-doyun": {
      name: t.landingPreviewDoyunName,
      line: t.landingPreviewDoyunLine,
    },
  } as const;
  const previewCharacters = PREVIEW_IDS.map((id) => getCharacterById(id)).filter(
    (c): c is NonNullable<ReturnType<typeof getCharacterById>> => Boolean(c),
  );

  return (
    <div className="min-h-full flex-1 bg-[#f5f6f8] dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-[430px] px-4 pb-20 pt-10 sm:px-5 sm:pt-14">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl dark:text-zinc-50">
            {t.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-zinc-400">
            {t.landingHeroSubtitle}
          </p>
          <div className="mx-auto mt-10 max-w-[280px]">
            <CtaButton label={t.start} />
          </div>
        </section>

        {/* Preview cards */}
        <section className="mt-16">
          <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {t.landingPreviewTitle}
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-zinc-500">
            {t.landingPreviewDesc}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {previewCharacters.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/characters?mbti=${encodeURIComponent(c.mbti)}`}
                  className="flex items-center gap-4 rounded-2xl border border-pink-100/80 bg-white p-3 shadow-sm transition hover:border-pink-200 hover:shadow-md dark:border-pink-900/30 dark:bg-zinc-900 dark:hover:border-pink-800/50"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
                    <Image
                      src={c.image}
                      alt={c.name[language]}
                      fill
                      className="object-cover object-left"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-zinc-50">
                        {previewCopy[c.id as keyof typeof previewCopy]?.name ??
                          c.name[language]}
                      </span>
                      <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        {c.mbti}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-zinc-400">
                      {previewCopy[c.id as keyof typeof previewCopy]?.line ??
                        c.description[language]}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Chat preview */}
        <section className="mt-16">
          <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {t.landingChatTitle}
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-zinc-500">
            {t.landingChatDesc}
          </p>
          <div className="mt-6">
            <LandingChatPreview
              name={t.landingPreviewHaerinName}
              message1={t.landingChatMsg1}
              message2={t.landingChatMsg2}
              message3={t.landingChatMsg3}
              placeholder={t.placeholder}
            />
          </div>
        </section>

        {/* Features */}
        <section className="mt-16 rounded-3xl border border-gray-200/80 bg-white p-6 dark:border-gray-800 dark:bg-zinc-900">
          <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {t.landingFeatureTitle}
          </h2>
          <ul className="mt-6 space-y-5">
            {features.map((f, i) => (
              <li key={f.title} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-purple-100 text-sm font-bold text-purple-700 dark:from-pink-950 dark:to-purple-950 dark:text-purple-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-zinc-100">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Emotional */}
        <section className="mt-16 text-center">
          <p className="text-lg font-medium leading-relaxed text-gray-800 dark:text-zinc-200">
            {t.landingEmotionalLine1}
            <br />
            <span className="text-purple-600 dark:text-purple-400">
              {t.landingEmotionalLine2}
            </span>
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-zinc-500">
            {t.landingEmotionalSub}
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="mt-14">
          <CtaButton label={t.start} />
        </section>
      </div>
    </div>
  );
}
