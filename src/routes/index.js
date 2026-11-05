
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTema } from "../contexts/TemaContext";

const Stack = createNativeStackNavigator();

// Tela de Login
function TelaLogin() {
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área Restrita</Text>

      <Button
        title="Entrar no Sistema"
        onPress={() => signIn("teste@email.com", "123")}
      />
    </View>
  );
}

// Tela Dashboard com tema dinâmico
function TelaDashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, alternarTema } = useTema();

  const escuro = tema === "escuro";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: escuro ? "#202124" : "#F5F5F5",
        },
      ]}
    >
      <Text
        style={[
          styles.titulo,
          { color: escuro ? "#FFFFFF" : "#14325A" },
        ]}
      >
        Bem-vindo, {usuario?.nome}
      </Text>

      <Text
        style={{
          color: escuro ? "#FFFFFF" : "#333333",
          marginBottom: 20,
        }}
      >
        Tema atual: {tema}
      </Text>

      <View style={styles.botao}>
        <Button
          title={escuro ? "Ativar Tema Claro" : "Ativar Tema Escuro"}
          onPress={alternarTema}
        />
      </View>

      <Button
        title="Sair da Conta"
        color="red"
        onPress={signOut}
      />
    </View>
  );
}

// Rotas protegidas
export default function Rotas() {
  const { logado, carregando } = useAuth();

if (carregando) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0066CC" />
      <Text>Carregando sessão...</Text>
    </View>
  );
}

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <Stack.Screen
            name="Dashboard"
            component={TelaDashboard}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={TelaLogin}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 20,
    textAlign: "center",
  },
  botao: {
    marginBottom: 20,
  },
});
