import SERVER from "../utils/server";

/**
 * Metodo que obtiene todos los pokemons
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 28/07/2022
 */
const getPokomons = async (url) => {
  let res = [];
  try {
    res = await SERVER.consulta(url, null, "GET");
  } catch (error) {
    res = [];
  }
  return res;
};
/**
 * Metodo que consulta por pokemon
 *
 * @author Alberto Arias
 * @version 1.0
 * @since 28/07/2022
 */
const getPokemon = async (url) => {
  let res = null;
  try {
    res = await SERVER.consulta(url, null, "GET");
  } catch (error) {
    res = null;
  }
  return res;
};

export { getPokomons, getPokemon };
