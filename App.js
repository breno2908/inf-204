import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function UrnaEletronica() {
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);
  const [votosC, setVotosC] = useState(0);

  // Estado controlado do mesário
  const [nomeMesario, setNomeMesario] = useState("");

  // Total de votos
  const totalVotos = votosA + votosB + votosC;

  // Porcentagens
  const porcentagemA =
    totalVotos === 0 ? 0 : (votosA / totalVotos) * 100;

  const porcentagemB =
    totalVotos === 0 ? 0 : (votosB / totalVotos) * 100;

  const porcentagemC =
    totalVotos === 0 ? 0 : (votosC / totalVotos) * 100;

  // Zerar a urna
  const zerarUrna = () => {
    setVotosA(0);
    setVotosB(0);
    setVotosC(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel de Votação</Text>

      {/* Mesário */}
      <View style={styles.mesarioContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do mesário"
          value={nomeMesario}
          onChangeText={setNomeMesario}
        />

        <Text style={styles.mesarioTexto}>
          Mesário atual: {nomeMesario}
        </Text>
      </View>

      {/* Candidato A */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato A: {votosA} votos - {porcentagemA.toFixed(1)}%
        </Text>

        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosA((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em A</Text>
        </TouchableOpacity>
      </View>

      {/* Candidato B */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato B: {votosB} votos - {porcentagemB.toFixed(1)}%
        </Text>

        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosB((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em B</Text>
        </TouchableOpacity>
      </View>

      {/* Candidato C */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato C: {votosC} votos - {porcentagemC.toFixed(1)}%
        </Text>

        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosC((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em C</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé */}
      <View style={styles.rodape}>
        <Text style={styles.totalTexto}>
          Total de Votos: {totalVotos}
        </Text>

        <TouchableOpacity
          style={styles.botaoZerar}
          onPress={zerarUrna}
        >
          <Text style={styles.textoBotao}>Zerar Urna</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },

  mesarioContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  mesarioTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14325A",
  },

  candidatoContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },

  nomeCandidato: {
    fontSize: 18,
    marginBottom: 10,
  },

  botaoVotar: {
    backgroundColor: "#0064A0",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  rodape: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 20,
  },

  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  botaoZerar: {
    backgroundColor: "#808080",
    padding: 15,
    borderRadius: 5,
  },
});