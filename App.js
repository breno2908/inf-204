import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function App() {
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1);
  }

  function decrementar() {
    if (contador > 0) {
      setContador(contador - 1);
    }
  }

  function zerar() {
    setContador(0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>

      <Text style={styles.contador}>{contador}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={incrementar}
      >
        <Text style={styles.textoBotao}>Incrementar (+1)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={decrementar}
      >
        <Text style={styles.textoBotao}>Decrementar (-1)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={zerar}
      >
        <Text style={styles.textoBotao}>Zerar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa"
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00695c",
    marginBottom: 10
  },

  contador: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#00695c",
    marginBottom: 30
  },

  botao: {
    backgroundColor: "#00695c",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 8,
    width: 220,
    alignItems: "center"
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold"
  }
});