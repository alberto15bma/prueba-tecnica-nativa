import { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import PaginacionPokemon from "../components/PaginacionPokemon";
import PokemonGrid from "../components/PokemonGrid";
import PokemonContext from "../context/PokemonContext";

export default function Principal({ navigation }) {
  const { filtraPokemon} = useContext(PokemonContext);
    useEffect(() => {
      navigation.setOptions({
        headerLargeTitle: true,
        title: "Lista de Pokemons",
      //  headerRight: () => <HeaderNav />,
        headerStyle: {
          backgroundColor: "yellow",
        },
        headerSearchBarOptions: {
          placeholder: "Buscar pokemon",
          headerIconColor: "black",
          inputType: "text",
          onChangeText: (event) => {
            filtraPokemon(event.nativeEvent.text);
          },
        },
      });
    }, [navigation]);
  return (
    <View style={styles.container}>
      <PokemonGrid />
      <PaginacionPokemon />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});