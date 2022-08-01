import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons"; 
import { NavigationContainer } from "@react-navigation/native";
import Configuracion from "./src/pages/Configuracion";
import Principal from "./src/pages/Principal";
import PokemonGrid from "./src/components/PokemonGrid";
import Guardado from "./src/pages/Guardado";
import PokemonDetalle from "./src/components/PokemonDetalle";
import { useContext } from "react";
import PokemonContext from "./src/context/PokemonContext";

const Tab = createBottomTabNavigator();
const InicioNavegacion = createNativeStackNavigator();

function MStack() {
  return (
    <InicioNavegacion.Navigator>
      <InicioNavegacion.Screen name="ListaPokemon" component={Principal} />
      <InicioNavegacion.Screen name="DetallePokemon" component={PokemonDetalle} />
    </InicioNavegacion.Navigator>
  );
}

function Tabs() {
  const { pokemonLocal } = useContext(PokemonContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Principal"
        options={{
          title: "Lista de pokemons",
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        component={MStack}
      />
      <Tab.Screen
        name="Guardado"
        options={{
          tabBarLabel: "Guardado",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="save" size={size} color={color} />
          ),
          tabBarBadge: pokemonLocal.length,
        }}
        component={Guardado}
      />
      <Tab.Screen
        name="Configuracion"
        options={{
          tabBarLabel: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
        component={Configuracion}
      />
    </Tab.Navigator>
  );
}

export default function Navegacion() {
  return ( <NavigationContainer><Tabs /></NavigationContainer>);
};
