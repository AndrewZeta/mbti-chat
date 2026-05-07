/** 홈 랜딩용 정적 DM 스타일 미리보기 (클라이언트 상태 없음) */
type LandingChatPreviewProps = {
  name: string;
  message1: string;
  message2: string;
  message3: string;
  placeholder: string;
};

export function LandingChatPreview({
  name,
  message1,
  message2,
  message3,
  placeholder,
}: LandingChatPreviewProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-200/50 dark:border-gray-700 dark:bg-zinc-900 dark:shadow-none">
      <header className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-2.5 dark:border-gray-800 dark:bg-zinc-900">
        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-purple-200 to-fuchsia-200 dark:from-purple-900 dark:to-fuchsia-900" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-gray-900 dark:text-zinc-50">
            {name}
          </p>
          <p className="truncate text-xs text-gray-500 dark:text-zinc-400">ENFP · enfp-haerin</p>
        </div>
        <div className="flex gap-1">
          <span className="h-9 w-9 rounded-full bg-gray-50 dark:bg-zinc-800" />
          <span className="h-9 w-9 rounded-full bg-gray-50 dark:bg-zinc-800" />
        </div>
      </header>
      <div className="space-y-2.5 bg-gray-50/90 px-3 py-4 dark:bg-zinc-950/50">
        <div className="flex justify-start">
          <div className="max-w-[82%] rounded-[22px] bg-gray-100 px-4 py-2.5 text-sm leading-relaxed text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">
            {message1}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[82%] rounded-[22px] bg-gradient-to-br from-purple-500 to-fuchsia-600 px-4 py-2.5 text-sm leading-relaxed text-white">
            {message2}
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[82%] rounded-[22px] bg-gray-100 px-4 py-2.5 text-sm leading-relaxed text-gray-900 dark:bg-zinc-800 dark:text-zinc-100">
            {message3}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-3 py-2 dark:border-gray-800 dark:bg-zinc-900">
        <div className="h-9 w-9 shrink-0 rounded-full bg-gray-100 dark:bg-zinc-800" />
        <div className="flex h-10 min-w-0 flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-400 dark:border-gray-700 dark:bg-zinc-800">
          {placeholder}
        </div>
        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600" />
      </div>
    </div>
  );
}
