
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";

import api from "./src/services/api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [tela, setTela] = useState("lista");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Buscar usuarios na API
  const buscarDados = async (atualizacao = false) => {
    if (atualizacao) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const resposta = await api.get("/users");
      setUtilizadores(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro.message);
      mostrarAlerta("Erro", "Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  // Mensagem para celular e navegador
  const mostrarAlerta = (titulo, mensagem) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  };

  // Enviar formulario para a API
  const cadastrarUsuario = async () => {
    if (!nome.trim() || !email.trim()) {
      mostrarAlerta("Atenção", "Preencha o nome e o email.");
      return;
    }

    setEnviando(true);

    try {
      const resposta = await api.post("/users", {
        name: nome.trim(),
        email: email.trim(),
      });

      mostrarAlerta(
        "Sucesso",
        `Usuário enviado com sucesso! ID: ${resposta.data.id}`
      );

      setNome("");
      setEmail("");
      setTela("lista");
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro.message);
      mostrarAlerta("Erro", "Não foi possível enviar o usuário.");
    } finally {
      setEnviando(false);
    }
  };

  // Tela do formulario
  if (tela === "formulario") {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastrar Usuário</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrarUsuario}
          disabled={enviando}
        >
          <Text style={styles.textoBotao}>
            {enviando ? "Enviando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => setTela("lista")}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Carregamento inicial
  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  // Tela da lista
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Utilizadores</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setTela("formulario")}
      >
        <Text style={styles.textoBotao}>Cadastrar Usuário</Text>
      </TouchableOpacity>

      <FlatList
        data={utilizadores}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => buscarDados(true)}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },
  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#666",
    marginTop: 5,
  },
  botao: {
    backgroundColor: "#0066cc",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoVoltar: {
    backgroundColor: "#777",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
});
