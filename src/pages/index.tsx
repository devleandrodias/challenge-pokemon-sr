import { GetServerSideProps } from "next";

import axios from "axios";

import PokemonGrid from "../components/pokemon-grid/pokemon-grid.component";

import { IPokemon } from "../interfaces/pokemon.interface";
import { IPokemonGridProps } from "../components/pokemon-grid/pokemon-grid.interface";

export default function Pokemons({ pokemons }: IPokemonGridProps) {
  return <PokemonGrid pokemons={pokemons} />;
}

export const getServerSideProps: GetServerSideProps<IPokemonGridProps> = async () => {
  const apiPokemon = axios.create({
    baseURL: process.env.NEXT_PUBLIC_POKEMON_API,
  });

  const {
    data: { results },
  } = await apiPokemon.get("pokemon");

  const pokemons: IPokemon[] = [];

  for (let index = 0; index < results.length; index++) {
    const { name, url } = results[index];

    const { data } = await apiPokemon.get(url);

    pokemons.push({
      name,
      url,
      imageUrl: data.sprites.other.dream_world.front_default,
    });
  }

  return {
    props: {
      pokemons,
    },
  };
};
