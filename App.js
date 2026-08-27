import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import JogoDaVelha from "./JogoDaVelha";

export default function App() {
  const [nome, setNome] = useState("Joao Vitor");
  const [seguindo, setSeguindo] = useState(false);

  const perfis = [
    {
      id: 1,
      nome: nome,
      profissao: "Engenheiro de Software",
      imagem: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      profissao: "Designer UX/UI",
      imagem: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      nome: "Carlos Santos",
      profissao: "Desenvolvedor Mobile",
      imagem: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloPagina}>
        Perfis de Usuários
      </Text>

      {perfis.map((perfil) => (
        <View key={perfil.id} style={styles.cartao}>
          <Image
            source={{ uri: perfil.imagem }}
            style={styles.avatar}
          />

          <Text style={styles.nomeUsuario}>
            {perfil.nome}
          </Text>

          <Text style={styles.profissao}>
            {perfil.profissao}
          </Text>

          {perfil.id === 1 ? (
            <TouchableOpacity
              style={[
                styles.botao,
                seguindo && styles.botaoDesativado,
              ]}
              activeOpacity={0.7}
              onPress={() => setSeguindo(!seguindo)}
            >
              <Text style={styles.textoBotao}>
                {seguindo ? "Já Seguindo" : "Seguir"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.botao}
              activeOpacity={0.7}
              onPress={() =>
                alert("Seguindo " + perfil.nome)
              }
            >
              <Text style={styles.textoBotao}>
                Seguir
              </Text>
            </TouchableOpacity>
          )}

          {perfil.id === 1 && (
            <TextInput
              style={styles.input}
              placeholder="Alterar nome..."
              value={nome}
              onChangeText={(texto) => setNome(texto)}
            />
          )}
        </View>
      ))}

      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },

  tituloPagina: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 25,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },

  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },

  botaoDesativado: {
    backgroundColor: "#999999",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },
});