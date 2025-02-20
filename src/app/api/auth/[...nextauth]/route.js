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
					const user = users.find((u) => u.email === credentials.email && u.psswrd === credentials.password);

					if (user) {
						// DOCU: Aqui añadimos un elemento mas para la autorizacion, el rol
						return { id: user.id, name: user.name, email: user.email, rol: user.rol };
					}
					return null;
				} catch (error) {
					console.error("Error en autenticación:", error);
					return null;
				}
			},
		}),
	],
	// El secret se usa para verificar la integridad de los JWT
	// Si no defines el NEXTAUTH_SECRET, NextAuth generará automáticamente uno por defecto. Sin embargo, es recomendable definir uno propio, especialmente en producción, para mayor seguridad.
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		// Se ejecuta cuando NextAuth devuelve la sesión del usuario. Todo a lo que queramos acceder debe estar aquí recogido
		async session({ session, token }) {
			session.user.id = token.sub;
			session.user.rol = token.rol;
			session.user.name = token.name;
			return session;
		},
		// El token es lo que NextAuth utiliza para mantener la información del usuario entre las solicitudes. Se ejecuta cada vez que NextAuth crea o actualiza el JWT
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
				// Para poder acceder tambien al rol y controlar el acceso, se lo pasamos a la sesión en forma de token, que ejecuta automaticamente al inicar sesion
				token.rol = user.rol;
				token.name = user.name;
			}
			return token;
		},
	},
});

export { handler as GET, handler as POST };

// TODO: entender bien todo esto: los callbacks, la exportacion como GET y POST, el uso de jwt y de session
