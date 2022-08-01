import { useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons"; 
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PokemonContext from "../context/PokemonContext";

function PaginacionPokemon() {
 const { previousPokemons, nextPokemons, pagina, previous , next} =
   useContext(PokemonContext);
 const btnAnterior = () => previous === null ? true : false;
 const btnSiguiente = () => (next === null ? true : false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={btnAnterior()}
        style={previous === null ? styles.botonDisabled : styles.boton}
        onPress={previousPokemons}
      >
        <AntDesign name="left" size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.txtPag}>
        <Text>Pag # {pagina}</Text>
      </View>

      <TouchableOpacity
      disabled={btnSiguiente()}
      style={styles.boton} onPress={nextPokemons}>
        <AntDesign name="right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#999999",
    borderTopWidth: 0.5,
    backgroundColor: "white",
  },
  boton: {
    backgroundColor: "steelblue",
    padding: 6,
    display: "flex",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    color: "white",
    justifyContent: "center",
    width: 40,
  },
  botonDisabled: {
    backgroundColor: "#999999",
    padding: 6,
    display: "flex",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    color: "white",
    justifyContent: "center",
    width: 40,
  },
  textoBoton: {
    color: "white",
  },
  txtPag: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default PaginacionPokemon;
