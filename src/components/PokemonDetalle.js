import { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import PokemonContext from "../context/PokemonContext";
import estilos from "../styles/estilos";
import Loading from "./Loading";

function PokemonDetalle({ route, navigation }) {
  const {
    pokemon,
    buscarPokemon,
    guardarPokemon,
    existePokemon,
    setExistePokemon,
    setPokemon,
    validarPokemon,
    eliminarPokemon,
  } = useContext(PokemonContext);
  const { url } = route.params;
  useEffect(() => {
    setPokemon(null);
    setExistePokemon(false);
    buscarPokemon(url);
    validarPokemon(url);
    
  }, [url]);
  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: "Detalle de Pokemon",
      headerRight: () => <HeaderNav />,
    });
  }, [navigation, existePokemon]);
  const HeaderNav = () => {
    return (
      <View style={styles.headerRight}>
        {!existePokemon ? (
          <TouchableOpacity onPress={() => guardarPokemon(url)}>
            <FontAwesome
              name="save"
              size={20}
              color="black"
              style={[styles.btnHeader, styles.btnGuardar]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => eliminarPokemon(url)}>
            <AntDesign
              name="delete"
              size={20}
              color="black"
              style={[styles.btnHeader, styles.btnEliminar]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const getTipos = (tipos) => {
    if(tipos.lenght === 0) return <Text>No existen datos</Text>;
    return tipos.map(item => <Text key={item} style={styles.textTag}>{item}</Text>);
  }
  const getSprites = (srpites) => { 
    if (srpites.lenght === 0) return <Text>No existen datos</Text>;
     return srpites.map((item) => (
       <Image key={item} style={styles.imagenSprit} source={{ uri: item}} />
     ));
  }
  const getMovimientos = (movimientos) => {
    if (movimientos.lenght === 0) return <Text>No existen datos</Text>;
    return movimientos.map((item) => (
      <Text key={item} style={styles.textTag}>
        {item}
      </Text>
    ));
  };
  return (
    <View style={styles.view}>
      {pokemon ? (
        <View style={styles.view}>
          <View style={styles.viewImagen}>
            <Image style={styles.imagen} source={{ uri: pokemon.imagen }} />
            <Text># {pokemon.id} </Text>
            <Text style={[estilos.textNegrita, styles.textNombre]}> {pokemon.nombre} </Text>
          </View>
          <SafeAreaView style={{flex: 1}}>
            <ScrollView vertical={true} style={styles.scrollView}>
              <View>
                <View style={styles.viewPokemon}>
                  <Text style={[estilos.textNegrita, styles.text]}>Types</Text>
                  <View style={[estilos.row, styles.viewWrap]}>{getTipos(pokemon.tipos)}</View>
                </View>
                <View style={styles.viewPokemon}>
                  <Text style={[estilos.textNegrita, styles.text]}>Peso</Text>
                  <Text>{pokemon.peso}</Text>
                </View>
                <View style={styles.viewPokemon}>
                  <Text style={[estilos.textNegrita, styles.text]}>Sprites</Text>
                  <View style={[estilos.row, styles.viewWrap]}>{getSprites(pokemon.sprites)}</View>
                </View>
                <View style={styles.viewPokemon}>
                  <Text style={[estilos.textNegrita, styles.text]}>Movimientos</Text>
                  <View style={[estilos.row, styles.viewWrap]}>{getMovimientos(pokemon.movimientos)}</View>
                </View>
              </View>
            </ScrollView>
            </SafeAreaView>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {},
  view: {
    flex: 1,
  },
  text: {
    color: "#999999",
    borderBottomColor: "#999999",
    borderBottomWidth: 0.2,
    fontSize: 16,
    paddingBottom: 3,
    marginBottom: 5,
  },
  textTag: {
    backgroundColor: "#CCCCCC",
    marginRight: 5,
    marginTop: 5,
    padding: 4,
    borderRadius: 6,
  },
  textNombre: {
    fontSize: 18,
  },
  viewPokemon: {
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewImagen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 200,
    height: 200,
  },
  imagenSprit: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    margin: 4,
  },
  viewWrap: {
    flexWrap: "wrap",
  },
  btnHeader: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnGuardar: {
    backgroundColor: "steelblue",
    color: "white",
  },
  btnEliminar: {
    backgroundColor: "#999999",
    color: "white",
  },
});
export default PokemonDetalle;