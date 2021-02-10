import { GetServerSideProps } from "next";
import axios from "axios";

interface IPokemonsProps {
  pokemons: IPokemonResult[];
}

interface IPokemonResult {
  name: string;
  url: string;
  imageUrl: string;
}

export default function Pokemons({ pokemons }: IPokemonsProps) {
  return (
    <section>
      {pokemons.map(({ name, url, imageUrl }) => {
        return (
          <div key={url}>
            <h1>{name}</h1>
            <img src={imageUrl} alt="pokemon"></img>
          </div>
        );
      })}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<IPokemonsProps> = async () => {
  const apiPokemon = axios.create({
    baseURL: process.env.NEXT_PUBLIC_POKEMON_API,
  });

  const {
    data: { results },
  } = await apiPokemon.get("pokemon");

  const pokemons: IPokemonResult[] = [];

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
