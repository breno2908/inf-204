import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Lista inicial com 15 contatos
const contatosIniciais = [
  { id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
  { id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
  { id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
  { id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
  { id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
  { id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
  { id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
  { id: "8", nome: "Helena Martins", telefone: "(31) 92222-8888" },
  { id: "9", nome: "Igor Oliveira", telefone: "(31) 91111-9999" },
  { id: "10", nome: "Julia Ferreira", telefone: "(31) 90000-1010" },
  { id: "11", nome: "Lucas Ribeiro", telefone: "(31) 98989-2020" },
  { id: "12", nome: "Mariana Gomes", telefone: "(31) 97878-3030" },
  { id: "13", nome: "Nicolas Santos", telefone: "(31) 96767-4040" },
  { id: "14", nome: "Olivia Carvalho", telefone: "(31) 95656-5050" },
  { id: "15", nome: "Pedro Almeida", telefone: "(31) 94545-6060" },
];

export default function Agenda() {
  const [contatos, setContatos] = useState(contatosIniciais);

  // Estado do Pull-to-Refresh
  const [carregando, setCarregando] = useState(false);

  // Renderiza cada contato
  const renderizarContato = ({ item }) => (
    <View style={styles.cardContato}>
      <Text style={styles.nomeText}>{item.nome}</Text>
      <Text style={styles.telefoneText}>{item.telefone}</Text>
    </View>
  );

  // Separador entre os contatos
  const renderizarSeparador = () => (
    <View style={styles.separador} />
  );

  // Exibido quando a agenda estiver vazia
  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.textoVazio}>Agenda Vazia.</Text>
    </View>
  );

  // Pull-to-Refresh
  const atualizarAgenda = () => {
    setCarregando(true);

    setTimeout(() => {
      setContatos(contatosIniciais);
      setCarregando(false);
    }, 2000);
  };

  // Rolagem infinita
  const carregarMaisContatos = () => {
    if (contatos.length === 0) {
      return;
    }

    const proximoId = contatos.length + 1;

    const novosContatos = [
      {
        id: String(proximoId),
        nome: `Novo Contato ${proximoId}`,
        telefone: "(31) 90000-0001",
      },
      {
        id: String(proximoId + 1),
        nome: `Novo Contato ${proximoId + 1}`,
        telefone: "(31) 90000-0002",
      },
      {
        id: String(proximoId + 2),
        nome: `Novo Contato ${proximoId + 2}`,
        telefone: "(31) 90000-0003",
      },
    ];

    setContatos((listaAtual) => [
      ...listaAtual,
      ...novosContatos,
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minha Agenda</Text>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={() => setContatos([])}
        >
          <Text style={styles.textoBotao}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContato}
        ItemSeparatorComponent={renderizarSeparador}
        ListEmptyComponent={renderizarVazio}

        refreshing={carregando}
        onRefresh={atualizarAgenda}

        onEndReached={carregarMaisContatos}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },

  botaoLimpar: {
    backgroundColor: "#D32F2F",
    padding: 10,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  cardContato: {
    padding: 20,
    backgroundColor: "#FFF",
  },

  nomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  telefoneText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  separador: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },

  containerVazio: {
    alignItems: "center",
    marginTop: 50,
  },

  textoVazio: {
    fontSize: 18,
    color: "#808080",
    fontStyle: "italic",
  },
});