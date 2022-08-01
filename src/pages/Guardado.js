import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import PokemonContext from "../context/PokemonContext";
import { AntDesign } from "@expo/vector-icons";

export default function Guardado() {
  const { pokemonLocal, buscarPokemon, eliminarPokemon, existePokemon } =
    useContext(PokemonContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPokemonsLocal();
  }, [pokemonLocal]);
  const cargarPokemonsLocal = async () => {
    setLoading(true);
    if (pokemonLocal.length === 0) {
      setData([]);
      setLoading(false);
      return;
    }
    const res = await Promise.all(
      pokemonLocal.map(async (url) => {
        return await buscarPokemon(url, true);
      })
    );
    setData(res);
    setLoading(false);
  };
  const pokemonClick = (item) => {
    navigation.navigate("DetallePokemon", { url: item.url, id: item.id });
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={() => pokemonClick(item)}>
          <View style={styles.container}>
            <Image style={styles.imagen} source={{ uri: item.imagen }} />
            <Text style={styles.textBold}>{item.nombre}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => eliminarPokemon(item.url)}>
          <View style={[styles.btnEliminar]}>
            <AntDesign name="delete" size={25} color="black" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <FlatList numColumns={1} data={data} renderItem={renderItem} />
      ) : (
        <View style={styles.viewVacio}>
          <Text>Sin datos</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderBottomColor: "#999999",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  headerRight: {
    display: "flex",
  },
  imagen: {
    width: 70,
    height: 70,
  },
  textBold: {
    fontWeight: "bold",
  },
  btnEliminar: {
    height: "100%",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  viewVacio: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent:"center"
  },
});
