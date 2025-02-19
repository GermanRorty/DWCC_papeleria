"use client"; 
// Debe ser 'use client' porque usa React Context. Para no transformar las paginas principales en CSR y que sigan siendo SSR (mas eficientes), lo declaramos en un componente independiente y lo llamamos al layout raiz

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
