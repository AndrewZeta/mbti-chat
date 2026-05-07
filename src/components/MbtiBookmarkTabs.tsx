"use client";

import { MBTI_TYPES } from "@/src/data/characters";

const MBTI_GROUPS = [
  MBTI_TYPES.slice(0, 4),
  MBTI_TYPES.slice(4, 8),
  MBTI_TYPES.slice(8, 12),
  MBTI_TYPES.slice(12, 16),
] as const;

type Props = {
  selected: string;
  onSelect: (mbti: string) => void;
};

function tabClass(isOn: boolean) {
  return isOn
    ? "px-3 py-2 text-sm font-bold text-purple-600 bg-purple-50 rounded-lg"
    : "px-3 py-2 text-sm text-gray-500";
}

/** 모바일: 상단 가로 스크롤 탭 */
export function MbtiBookmarkTabsMobile({ selected, onSelect }: Props) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="MBTI 유형 선택"
    >
      {MBTI_GROUPS.map((group, gi) => (
        <div key={gi} className="flex shrink-0 gap-2">
          {group.map((mbti) => {
            const isOn = mbti === selected;
            return (
              <button
                key={mbti}
                type="button"
                role="tab"
                aria-selected={isOn}
                onClick={() => onSelect(mbti)}
                className={`shrink-0 whitespace-nowrap transition ${tabClass(isOn)}`}
              >
                {mbti}
              </button>
            );
          })}
          {gi < MBTI_GROUPS.length - 1 ? (
            <div
              className="w-px shrink-0 self-stretch bg-gray-200/80"
              aria-hidden
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** PC: 왼쪽 세로 사이드바 */
export function MbtiBookmarkTabsSidebar({ selected, onSelect }: Props) {
  return (
    <aside
      className="hidden h-full w-[110px] shrink-0 flex-col border-r border-gray-200 py-4 pr-2 md:flex dark:border-gray-700"
      role="tablist"
      aria-label="MBTI 유형 선택"
    >
      {MBTI_GROUPS.map((group, gi) => (
        <div key={gi} className="mb-4 flex flex-col gap-1 last:mb-0">
          {group.map((mbti) => {
            const isOn = mbti === selected;
            return (
              <button
                key={mbti}
                type="button"
                role="tab"
                aria-selected={isOn}
                onClick={() => onSelect(mbti)}
                className={`w-full text-left transition ${tabClass(isOn)}`}
              >
                {mbti}
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
