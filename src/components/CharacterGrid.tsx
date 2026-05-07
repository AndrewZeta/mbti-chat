import type { Character } from "@/src/data/characters";
import { CharacterCard } from "@/src/components/CharacterCard";

type Props = {
  characters: Character[];
};

export function CharacterGrid({ characters }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
