"use client";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";

export const StoreContext = React.createContext();

function Provider({ children }) {
  const [state, setState] = useState({ search: "" });
  console.log("children : ", children);
  return (
    <StoreContext.Provider value={[state, setState]}>
      <SessionProvider>{children}</SessionProvider>
    </StoreContext.Provider>
  );
}

export default Provider;
