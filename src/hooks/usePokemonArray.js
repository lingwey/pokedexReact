import { useState, useEffect } from 'react';
import axios from 'axios';

const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon';

function usePokemonArray({pagina}) {
  const [arrayPokemon, setArrayPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const limite = 15;
      const xPagina = (pagina - 1) * limite;
      try {
        const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xPagina}&limit=${limite}`);
        setArrayPokemon(apiPoke.data.results);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, [pagina]);

  return arrayPokemon;
}

export default usePokemonArray;