"use client";
import { syncUserCartToDB } from "@/lib/services/carrito";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
	const { data: session } = useSession();

	const logoutProcess = async () => {
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		await syncUserCartToDB(session.user.id, cart);
    localStorage.removeItem("cart");
		signOut();
	};

	return (
		<div>
			{session ? (
				<>
					<p>Bienvenido, {session.user.name}!</p>
					<button onClick={logoutProcess}>Cerrar sesión</button>
				</>
			) : (
				<div>
					<button onClick={() => signIn()}>Iniciar sesión</button>
					<Link href="/usuarios/gestion">Registrarse</Link>
				</div>
			)}
		</div>
	);
}

// console.log("Datos de sesion:", session);
// useEffect(() => {
// 	if (session != undefined) {
// 		const userId = session.user.id;
// 		console.log(userId);
// 	}
// }, [session]);
