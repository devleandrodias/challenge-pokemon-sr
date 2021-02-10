import { IPokemonCardProps } from "./pokemon-card.interface";

export default function PokemonCard({
  pokemon: { imageUrl, name, url },
}: IPokemonCardProps) {
  return (
    <div key={url}>
      <h1>{name}</h1>
      <img src={imageUrl} alt="pokemon"></img>
    </div>
  );
}
