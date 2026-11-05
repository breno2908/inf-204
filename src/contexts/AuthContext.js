
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);

const CHAVE_USUARIO = "@AppAuth:Usuario";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera a sessão salva ao abrir o aplicativo
  useEffect(() => {
    async function carregarSessao() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(
          CHAVE_USUARIO
        );

        if (usuarioSalvo !== null) {
          const dadosUsuario = JSON.parse(usuarioSalvo);
          setUsuario(dadosUsuario);
        }
      } catch (erro) {
        console.error("Erro ao recuperar sessão:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarSessao();
  }, []);

  // Login simulado
  async function signIn(email, senha) {
    try {
      const respostaAPI = {
        id: "123",
        nome: "Turma INF204",
        email: email,
      };

      // Salva o objeto no AsyncStorage
      await AsyncStorage.setItem(
        CHAVE_USUARIO,
        JSON.stringify(respostaAPI)
      );

      setUsuario(respostaAPI);
    } catch (erro) {
      console.error("Erro ao salvar sessão:", erro);
    }
  }

  // Logout e remoção da sessão
  async function signOut() {
    try {
      await AsyncStorage.removeItem(CHAVE_USUARIO);
      setUsuario(null);
    } catch (erro) {
      console.error("Erro ao encerrar sessão:", erro);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logado: !!usuario,
        usuario,
        carregando,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

