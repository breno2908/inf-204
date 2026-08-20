import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Contador() {
  const [contagem, setContagem] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contagem Atual:</Text>

      <Text style={styles.numero}>{contagem}</Text>

      <Button
        title="Incrementar +1"
        onPress={() => setContagem(contagem + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  titulo: {
    fontSize: 20,
    color: "#333333"
  },
  numero: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20
  }
});