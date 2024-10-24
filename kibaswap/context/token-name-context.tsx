"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const TokenNameContext = createContext({
  secondTokenName: "USD Coin",
  setSecondTokenName: (name: string) => {},
});

export const TokenNameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [secondTokenName, setSecondTokenName] = useState("");

  return (
    <TokenNameContext.Provider value={{ secondTokenName, setSecondTokenName }}>
      {children}
    </TokenNameContext.Provider>
  );
};

export const useTokenNameContext = () => useContext(TokenNameContext);
