import { createContext, useEffect, useState } from "react";
import { getPokemon, getPokomons } from "../services/PokemonService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltro, setPokemonsFiltro] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [pokemonLocal, setPokemonLocal] = useState([]);
    const [existePokemon, setExistePokemon] = useState(false);

    useEffect(() => {
      cargarPokemons(null);
      cargarPokemonsFiltro();
    }, []);
    useEffect(() => {
      setNumeroPagina();
    }, [next]);

    const cargarPokemons = async (url) => {
      setCargando(true);
      try {
        const data = await getPokomons(url);
        const { results, next, previous } = data;
        let arrayPokemons = await Promise.all(
          results.map(async (result) => {
            let res = await getPokemon(result.url);
            return {
              id: res.id,
              nombre: res.name,
              imagen: res.sprites.front_default,
              url: result.url,
            };
          })
        );
        setNext(next);
        setPrevious(previous);
        setPokemons(arrayPokemons);
      } catch (error) {}
      finally {
        setCargando(false);
      }
    };
    const cargarPokemonsFiltro = async () => {
      try {
        const data = await getPokomons("https://pokeapi.co/api/v2/pokemon?limit=100");
        const { results, next, previous } = data;
        let arrayPokemons = await Promise.all(
          results.map(async (result) => {
            let res = await getPokemon(result.url);
            return {
              id: res.id,
              nombre: res.name,
              imagen: res.sprites.front_default,
              url: result.url,
            };
          })
        );
        setPokemonsFiltro(arrayPokemons);
        console.log(arrayPokemons);
      } catch (error) {
        setPokemonsFiltro([]);
      } 
    };
    const filtraPokemon = async (e) => {
      console.log(e);
        setPokemons([]);
        setCargando(true);
        if (e.length <= 0) {
          cargarPokemons(null);
          return;
        }
        const data = pokemonsFiltro.filter(item => {
          const nombre = item.nombre.toLowerCase();
          const texto = e.toLowerCase();
          return nombre.indexOf(texto) > -1;
        })
        setPokemons(data);
        setCargando(false);
    }
    const getSprites = (sprites) => {
      if (sprites !== null) {
        return Object.values(sprites).filter((a) => a !== null).slice(0, 4);
      }else {
        return []
      }
    };
    const getTipos = (tipos) => {
      if (tipos !== null) {
        return tipos
          .map((item) => item.type.name)
          //.join()
          //.replaceAll(",", " ");
      } else {
        return [];
      }
    };
    const getMovimientos = (moves) => {
      if (moves !== null) {
        return moves
          .slice(0, 3)
          .map((item) => item.move.name).filter((a) => a !== null)
          //.join()
          //.replaceAll(",", " ");
      } else {
        return [];
      }
    };
    const buscarPokemon = async (url, resp = false) => {
     // setPokemon(null);
      let res = await getPokemon(url);
      if(res !== null) {
        const { sprites, types, weight, moves } = res;
        let pok = {
          id: res.id,
          nombre: res.name,
          imagen: res.sprites.front_default,
          url: url,
          tipos: getTipos(types),
          peso: `${weight}kg`,
          sprites: getSprites(sprites),
          movimientos: getMovimientos(moves),
        };
        if(!resp)
          setPokemon(pok);
        //let existe = await validarExistePokemons(url);
       // setExistePokemon(existe);
        return pok
      }
      return null;
    }
    const validarPokemon =  (url) => {
      let existe =  validarExistePokemons(url);
      setExistePokemon(existe);
    }

    const nextPokemons = async () => {
      if(next == null) {
        alert("No existen registros para cargar");
        return;
      }
      setPokemons([]);
      cargarPokemons(next);
    }
    const previousPokemons = async () => {
      if (previous == null) {
        alert("No existen registros para cargar");
        return;
      }
      setPokemons([]);
      cargarPokemons(previous);
    };

    const setNumeroPagina = () => {
      if (next === null){
        setPagina(1);
        return
      }
      let numeros = next
        .split("?")[1]
        .split("&")
        .map((item) => parseInt(item.split("=")[1]));
      let desp = numeros[0],
          ant = numeros[1];
      let pag = desp / ant;
      setPagina(pag);
    }

    const guardarPokemon = async (url) => {
      try {
        if (validarExistePokemons(url)) {
          Alert.alert("Error", "Ya se encuentra registrado este pokemon");
          return;
        }
        let nuevo = pokemonLocal.concat(url);
        console.log(nuevo);
        //await AsyncStorage.setItem("@pokemons", JSON.stringify(nuevo));
        Alert.alert("Alerta", "Se agregó correctamente el pokemon");
        
        setPokemonLocal(nuevo);
        let existe = validarExistePokemons(url);
        setExistePokemon(existe);
      } catch (error) {
        Alert.alert("Error", error);
      }
    };
    const eliminarPokemon = (url) => {
      try {
       // const listaPok = await getPokemonslocal();
      //  const listaNueva = listaPok.filter((item) => item !== url);
        const listaNueva = pokemonLocal.filter((item) => item !== url);
        //await AsyncStorage.setItem("@pokemons", JSON.stringify(listaNueva));
        
        setPokemonLocal(listaNueva);
        const existe =  validarExistePokemons(url);
        setExistePokemon(existe);
        Alert.alert("Alerta", "Se eliminó correctamente el pokemon");
      } catch (error) {
        Alert.alert("Error", error);
      }
    }
    const validarExistePokemons =  (url) => {
      //const listaPok = await getPokemonslocal();
      const existePok = pokemonLocal.find((item) => item === url);
      if (existePok === undefined) {
        return false;
      }
      return true;
    };
    const getPokemonslocal = async () => {
      let res = [];
      try {
        await AsyncStorage.removeItem("@pokemons");
        let pokLocal = await AsyncStorage.getItem("@pokemons");
        pokLocal = pokLocal === null ? [] : JSON.parse(pokLocal);
        //setPokemonLocal(pokLocal);
        res = pokLocal;
      } catch (error) {
        res = [];
      }
      return res;
    }

  const data = {
    pokemon,
    pokemons,
    nextPokemons,
    previousPokemons,
    previous,
    next,
    buscarPokemon,
    busqueda,
    setBusqueda,
    filtraPokemon,
    cargando,
    pagina,
    guardarPokemon,
    pokemonLocal,
    getPokemonslocal,
    validarExistePokemons,
    existePokemon,
    setPokemon,
    setExistePokemon,
    eliminarPokemon,
    validarPokemon,
  };
  return (
    <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>
  );
};

export { PokemonProvider };
export default PokemonContext;
