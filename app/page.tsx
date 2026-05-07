import Image from "next/image";
import Link from "next/link";
import { LandingChatPreview } from "@/src/components/landing/LandingChatPreview";
import { getCharacterById } from "@/src/data/characters";

const PREVIEW_IDS = ["entj-seojun", "enfp-haerin", "istp-doyun"] as const;

const FEATURES = [
  {
    title: "MBTI 기반 대화",
    body: "16가지 타입별로 다른 말투와 반응. 진짜 그 사람과 대화하는 듯한 몰입을 느껴보세요.",
  },
  {
    title: "감정 반응",
    body: "공감, 설렘, 긴장까지. 메시지 하나하나에 캐릭터가 감정으로 답해요.",
  },
  {
    title: "연애 시뮬레이션",
    body: "부담 없이 대화만으로 연애 리허설. 오늘의 감정을 가볍게 풀어보세요.",
  },
];

function CtaButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/characters"
      className={`inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-base font-semibold text-white shadow-md shadow-pink-200/40 transition hover:opacity-95 dark:shadow-none ${className}`}
    >
      지금 시작하기
    </Link>
  );
}

export default function Home() {
  const previewCharacters = PREVIEW_IDS.map((id) => getCharacterById(id)).filter(
    (c): c is NonNullable<ReturnType<typeof getCharacterById>> => Boolean(c),
  );

  return (
    <div className="min-h-full flex-1 bg-[#f5f6f8] dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-[430px] px-4 pb-20 pt-10 sm:px-5 sm:pt-14">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl dark:text-zinc-50">
            MBTI로 만나는 연애
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-zinc-400">
            지금, 너랑 가장 잘 맞는 사람은?
          </p>
          <div className="mx-auto mt-10 max-w-[280px]">
            <CtaButton />
          </div>
        </section>

        {/* Preview cards */}
        <section className="mt-16">
          <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-zinc-100">
            이런 타입과 대화해요
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-zinc-500">
            카드를 눌러 캐릭터를 골라 보세요
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
                      alt={c.name}
                      fill
                      className="object-cover object-left"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-zinc-50">
                        {c.name}
                      </span>
                      <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-bold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        {c.mbti}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-zinc-400">
                      {c.tagline}
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
            대화는 이렇게 이어져요
          </h2>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-zinc-500">
            인스타 DM처럼 익숙한 화면
          </p>
          <div className="mt-6">
            <LandingChatPreview />
          </div>
        </section>

        {/* Features */}
        <section className="mt-16 rounded-3xl border border-gray-200/80 bg-white p-6 dark:border-gray-800 dark:bg-zinc-900">
          <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-zinc-100">
            왜 MBTI 연애 시뮬인가요
          </h2>
          <ul className="mt-6 space-y-5">
            {FEATURES.map((f, i) => (
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
            밤에 혼자 떠올렸던 그 사람,
            <br />
            <span className="text-purple-600 dark:text-purple-400">
              여기서 한 번 더 만나볼 수 있어요.
            </span>
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-zinc-500">
            부담 없이, 지금 이 순간만큼은 대화에만 집중해 보세요.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="mt-14">
          <CtaButton />
        </section>
      </div>
    </div>
  );
}
