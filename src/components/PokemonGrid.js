import { useContext, useEffect } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PokemonContext from "../context/PokemonContext";
import Loading from "./Loading";

function PokemonGrid() {
  const { pokemons } = useContext(PokemonContext);
  const navigation = useNavigation();
  const pokemonClick = (item) => {
    navigation.navigate("DetallePokemon", {url: item.url, id: item.id});
  }
  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => pokemonClick(item)}>
        <View style={styles.container}>
          <Image style={styles.imagen} source={{ uri: item.imagen }} />
          <Text style={styles.textBold}># {item.id}</Text>
          <Text>{item.nombre}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <>
      {pokemons.length > 0 ?
        <FlatList
          numColumns={4}
          keyExtractor={(item) => item.id}
          data={pokemons}
          renderItem={renderItem}
        />
        : <Loading />
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10,
    flex: 1,
    maxWidth: "25%",
    display: "flex",
    alignItems: 'center',
    borderRadius: 10,
  },
  headerRight: {
    display: "flex",
  },
  imagen: {
    width: 100,
    height: 100,
  },
  textBold: {
    fontWeight: "bold",
  }
});

export default PokemonGrid;