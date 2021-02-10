import { IPokemonGridProps } from "./pokemon-grid.interface";

import PokemonCard from "../pokemon-card/pokemon-card.component";

export default function PokemonGrid({ pokemons }: IPokemonGridProps) {
  return (
    <div>
      {pokemons.map((pokemon) => {
        return <PokemonCard pokemon={pokemon} />;
      })}
    </div>
  );
}
