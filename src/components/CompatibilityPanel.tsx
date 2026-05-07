"use client";

import { useMemo, useState } from "react";
import {
  getCompatibility,
  mbtiTypes,
  type CompatibilityResult,
  type MbtiType,
} from "@/src/data/compatibility";

const genders = ["여성", "남성"] as const;

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-rose-900/80 dark:text-rose-200/80">
        <span>{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-2.5 rounded-full bg-rose-100 dark:bg-rose-950/40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 to-violet-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function CompatibilityPanel() {
  const [myName, setMyName] = useState("");
  const [myMbti, setMyMbti] = useState<MbtiType>("INFP");
  const [myGender, setMyGender] = useState<(typeof genders)[number]>("여성");
  const [partnerName, setPartnerName] = useState("");
  const [partnerMbti, setPartnerMbti] = useState<MbtiType>("ENFP");
  const [partnerGender, setPartnerGender] = useState<(typeof genders)[number]>("남성");
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const pairTitle = useMemo(() => `${myMbti} + ${partnerMbti}`, [myMbti, partnerMbti]);

  return (
    <div className="mx-auto w-full max-w-[720px] space-y-6">
      <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm dark:border-pink-900/40 dark:bg-zinc-900 sm:p-6">
        <h3 className="text-base font-semibold text-rose-950 dark:text-rose-100">내 정보</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
            placeholder="내 이름"
            className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
          />
          <select
            value={myMbti}
            onChange={(e) => setMyMbti(e.target.value as MbtiType)}
            className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
          >
            {mbtiTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={myGender}
            onChange={(e) => setMyGender(e.target.value as (typeof genders)[number])}
            className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm dark:border-pink-900/40 dark:bg-zinc-900 sm:p-6">
        <h3 className="text-base font-semibold text-rose-950 dark:text-rose-100">상대 정보</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="상대 이름"
            className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
          />
          <select
            value={partnerMbti}
            onChange={(e) => setPartnerMbti(e.target.value as MbtiType)}
            className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
          >
            {mbtiTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={partnerGender}
            onChange={(e) => setPartnerGender(e.target.value as (typeof genders)[number])}
            className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-rose-900 dark:bg-zinc-950 dark:text-zinc-50"
          >
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setResult(getCompatibility(myMbti, partnerMbti))}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:text-base"
        >
          궁합 보기
        </button>
      </section>

      {result ? (
        <section className="space-y-4 rounded-3xl border border-pink-100 bg-white p-5 shadow-sm dark:border-pink-900/40 dark:bg-zinc-900 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                {pairTitle}
              </p>
              <h3 className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {result.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{result.subtitle}</p>
            </div>
            <div className="shrink-0 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 px-4 py-3 text-center text-white">
              <p className="text-xs">궁합 점수</p>
              <p className="text-2xl font-bold">{result.score}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {result.summary}
          </p>

          {(myName || partnerName) ? (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-900/80 dark:bg-rose-950/30 dark:text-rose-200/80">
              {myName || "나"}({myGender}) ↔ {partnerName || "상대"}({partnerGender})
            </p>
          ) : null}

          <div className="space-y-3">
            <MetricBar label="신뢰도" value={result.trust} />
            <MetricBar label="소통력" value={result.communication} />
            <MetricBar label="책임감 밸런스" value={result.responsibility} />
            <MetricBar label="유머 케미" value={result.humor} />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4 dark:border-rose-900/30 dark:bg-rose-950/20">
              <h4 className="text-sm font-semibold text-rose-950 dark:text-rose-100">
                {result.myLoveStyle.title}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {result.myLoveStyle.points.map((point, idx) => (
                  <li key={idx} className="text-xs leading-relaxed text-rose-900/80 dark:text-rose-200/80">
                    • {point}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4 dark:border-violet-900/30 dark:bg-violet-950/20">
              <h4 className="text-sm font-semibold text-violet-950 dark:text-violet-100">
                {result.partnerLoveStyle.title}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {result.partnerLoveStyle.points.map((point, idx) => (
                  <li key={idx} className="text-xs leading-relaxed text-violet-900/80 dark:text-violet-200/80">
                    • {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}
    </div>
  );
}

