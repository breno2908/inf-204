
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

// Inicialização do SQLite
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Base de Dados inicializada!");
};

export default function App() {
  return (
    <SQLiteProvider
      databaseName="app-database.db"
      onInit={iniciarBanco}
    >
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

function EcraPrincipal() {
  const db = useSQLiteContext();

  // DESAFIO 2: usuário armazenado como objeto
  const [usuario, setUsuario] = useState({
    nome: "Visitante",
    logado: true,
  });

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // DESAFIO 2: recuperar objeto com JSON.parse()
  const carregarPreferencias = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem(
        "@AppTarefas:Usuario"
      );

      if (usuarioSalvo !== null) {
        const objetoUsuario = JSON.parse(usuarioSalvo);
        setUsuario(objetoUsuario);
      }
    } catch (erro) {
      console.error("Erro ao carregar usuário:", erro);
    }
  };

  // DESAFIO 2: salvar objeto com JSON.stringify()
  const salvarNome = async () => {
    try {
      const novoUsuario = {
        nome: "Estudante INF204",
        logado: true,
      };

      await AsyncStorage.setItem(
        "@AppTarefas:Usuario",
        JSON.stringify(novoUsuario)
      );

      setUsuario(novoUsuario);
    } catch (erro) {
      console.error("Erro ao salvar usuário:", erro);
    }
  };

  // SELECT
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );

      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados:", erro);
    }
  };

  // INSERT
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [novaTarefa.trim(), 0]
      );

      setNovaTarefa("");
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  };

  // UPDATE
  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;

      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  };

  // DESAFIO 1: DELETE
  const excluirTarefa = async (id) => {
    try {
      await db.runAsync(
        "DELETE FROM tarefas WHERE id = ?;",
        [id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Olá, {usuario.nome}!
        </Text>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
        >
          <Text style={styles.textoBotao}>
            Mudar Nome
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <TouchableOpacity
              style={styles.areaTarefa}
              onPress={() =>
                alternarStatus(item.id, item.concluida)
              }
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida === 1 &&
                    styles.textoConcluido,
                ]}
              >
                {item.descricao}
              </Text>
            </TouchableOpacity>

            {/* DESAFIO 1: botão para excluir */}
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirTarefa(item.id)}
            >
              <Text style={styles.textoExcluir}>X</Text>
            </TouchableOpacity>
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
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
    flexShrink: 1,
  },
  botaoAcao: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },
  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },
  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  areaTarefa: {
    flex: 1,
    paddingRight: 10,
  },
  textoTarefa: {
    fontSize: 18,
    color: "#333",
  },
  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  botaoExcluir: {
    backgroundColor: "#D32F2F",
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textoExcluir: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
