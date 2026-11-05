
import React, { createContext, useContext, useState } from "react";

// Contexto responsável pelo tema
export const TemaContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  // Alterna entre claro e escuro
  function alternarTema() {
    setTema((temaAtual) =>
      temaAtual === "claro" ? "escuro" : "claro"
    );
  }

  return (
    <TemaContext.Provider
      value={{ tema, alternarTema }}
    >
      {children}
    </TemaContext.Provider>
  );
}

// Hook para acessar o tema
export function useTema() {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error(
      "useTema deve ser usado dentro de um ThemeProvider"
    );
  }

  return context;
}
