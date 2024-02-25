import { useState, useEffect } from 'react';
import axios from 'axios';

const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon';

function useGlobalPokemon() {
  const [globalPokemon, setGlobalPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);
        const promesas = respuesta.data.results.map((pokemon) => pokemon);
        const result = await Promise.all(promesas);
        setGlobalPokemon(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, []);

  return globalPokemon;
}

export default useGlobalPokemon;