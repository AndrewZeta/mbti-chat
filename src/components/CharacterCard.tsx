import Link from "next/link";
import type { Character } from "@/src/data/characters";

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  return (
    <Link
      href={`/chat/${character.id}`}
      className="group flex flex-col rounded-2xl border border-rose-200/90 bg-gradient-to-br from-white to-rose-50/80 p-4 shadow-sm shadow-rose-100/40 transition hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 dark:border-rose-900/50 dark:from-zinc-900 dark:to-violet-950/30 dark:shadow-none dark:hover:border-violet-600"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="rounded-lg bg-gradient-to-r from-rose-100 to-violet-100 px-2 py-0.5 text-sm font-semibold text-violet-900 dark:from-rose-950 dark:to-violet-950 dark:text-violet-200">
          {character.mbti}
        </span>
        <span className="text-xs text-rose-800/70 dark:text-rose-200/60">
          {character.gender}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
        {character.name}
      </h2>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {character.tagline}
      </p>
    </Link>
  );
}
