import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [jogadorAtual, setJogadorAtual] = useState("X");

  function jogar(posicao) {
    if (tabuleiro[posicao] !== "") {
      return;
    }

    const novoTabuleiro = [...tabuleiro];

    novoTabuleiro[posicao] = jogadorAtual;

    setTabuleiro(novoTabuleiro);

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  }

  function reiniciarJogo() {
    setTabuleiro([
      "", "", "",
      "", "", "",
      "", "", "",
    ]);

    setJogadorAtual("X");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>

      <Text style={styles.vez}>
        Vez do jogador: {jogadorAtual}
      </Text>

      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          <Celula valor={tabuleiro[0]} onPress={() => jogar(0)} />
          <Celula valor={tabuleiro[1]} onPress={() => jogar(1)} />
          <Celula valor={tabuleiro[2]} onPress={() => jogar(2)} />
        </View>

        <View style={styles.linha}>
          <Celula valor={tabuleiro[3]} onPress={() => jogar(3)} />
          <Celula valor={tabuleiro[4]} onPress={() => jogar(4)} />
          <Celula valor={tabuleiro[5]} onPress={() => jogar(5)} />
        </View>

        <View style={styles.linha}>
          <Celula valor={tabuleiro[6]} onPress={() => jogar(6)} />
          <Celula valor={tabuleiro[7]} onPress={() => jogar(7)} />
          <Celula valor={tabuleiro[8]} onPress={() => jogar(8)} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.botaoReiniciar}
        onPress={reiniciarJogo}
      >
        <Text style={styles.textoBotao}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

function Celula({ valor, onPress }) {
  return (
    <TouchableOpacity
      style={styles.celula}
      onPress={onPress}
    >
      <Text style={styles.textoCelula}>{valor}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 10,
  },

  vez: {
    fontSize: 16,
    marginBottom: 15,
    color: "#505050",
  },

  tabuleiro: {
    flexDirection: "column",
  },

  linha: {
    flexDirection: "row",
  },

  celula: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#14325A",
    justifyContent: "center",
    alignItems: "center",
  },

  textoCelula: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#0064A0",
  },

  botaoReiniciar: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});