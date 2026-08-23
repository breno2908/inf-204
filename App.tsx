import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ItemTarefa, { Tarefa } from "./ItemTarefa";

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      id: 1,
      descricao: "Estudar ES6+",
      concluida: true,
    },
    {
      id: 2,
      descricao: "Configurar ambiente Expo",
      concluida: true,
    },
    {
      id: 3,
      descricao: "Entender o funcionamento do JSX",
      concluida: false,
    },
    {
      id: 4,
      descricao: "Finalizar Roteiro de Pratica 02",
      concluida: false,
    },
  ]);

  const tarefasPendentes: Tarefa[] = tarefas.filter(
    (tarefa) => !tarefa.concluida
  );

  function adicionarTarefa(): void {
    const novaTarefa: Tarefa = {
      id: tarefas.length + 1,
      descricao: `Nova tarefa ${tarefas.length + 1}`,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      {tarefas.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          tarefa={tarefa}
        />
      ))}

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarTarefa}
      >
        <Text style={styles.textoBotao}>
          Adicionar Nova Tarefa
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>
        Tarefas Pendentes
      </Text>

      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa
          key={`pendente-${tarefa.id}`}
          tarefa={tarefa}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    color: "#20325a",
  },

  botao: {
    backgroundColor: "#20325a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});