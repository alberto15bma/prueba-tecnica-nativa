import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from "react-native";
import PokemonGrid from './src/components/PokemonGrid';
import { PokemonProvider } from './src/context/PokemonContext';
import PokemonDetalle from './src/components/PokemonDetalle';
import Navegacion from './Navegacion';

export default function App() {
  return (
    <PokemonProvider>
      <Navegacion />
    </PokemonProvider>
  );
}

