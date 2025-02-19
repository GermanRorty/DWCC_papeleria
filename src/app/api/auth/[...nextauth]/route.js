import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Se puede usar otro proveedor de credenciales como Google, Github o Facebook. Nosotros usaremos los almacenados en JSON server

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" }, //Proporciona el DOM para la autenticacion
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:4000/usuarios");
          const users = await res.json();

          // Buscar usuario en la base de datos JSON
          const user = users.find(
            (u) => u.email === credentials.email && u.psswrd === credentials.password
          );

          if (user) {
            return { id: user.id, name: user.name, email: user.email };
          }
          return null;
        } catch (error) {
          console.error("Error en autenticación:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
});

export { handler as GET, handler as POST };

// TODO: entender bien todo esto: los callbacks, la exportacion como GET y POST, el uso de jwt y de session