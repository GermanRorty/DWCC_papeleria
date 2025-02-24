"use client";
import { syncDBCartToUser, syncUserCartToDB } from "@/lib/services/carrito";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useEffect, useRef } from "react";

export default function AuthComponent() {
	const { status, data: session } = useSession(); // Desestructura y renombra: data->session
	const { cart, setCart, cartSynced, setCartSynced } = useCartContext();

	const logoutProcess = async () => {
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		await syncUserCartToDB(session.user.id, cart);
		signOut();
		localStorage.removeItem("cart");
		setCartSynced(false);
		// // DEBUG:
		// console.log("Carro antes de cerrar sesion", cart);
	};

	const loginProcess = async () => {
		await signIn();
	};

	useEffect(() => {
		if (status === "authenticated" && !cartSynced) {
			const syncCart = async () => {
				const cartRetrieved = await syncDBCartToUser(session.user.id);
				// Lo devolvemos en forma de Array, ya que es como lo manipula el programa principal
				const cartRetrievedList = Object.values(cartRetrieved);
				// Como puede ya haber metido algo en el carrito sin tener la sesión abierta, lo fusionamos
				cartRetrievedList.forEach((item) => {
					const foundArticle = cart.find((article) => article.id === item.id);
					if (foundArticle) item.quantity += foundArticle.quantity;
				});

				const fusionCart = [...cartRetrievedList, ...cart.filter((c) => !cartRetrievedList.some((i) => i.id === c.id))];

				setCart(fusionCart);
				setCartSynced(true);
			};
			syncCart();
		}
	}, [session]);

	return (
		<>
			{session ? (
				<>
					<li>
						<button className="dropdown-item" onClick={logoutProcess}>
							Cerrar sesión
						</button>
					</li>
					<li>
						<Link className="dropdown-item" href={`/gestion/usuarios/${session?.user.id}`}>
							Ajustes
						</Link>
					</li>
				</>
			) : (
				<>
					<li>
						<button className="dropdown-item" onClick={loginProcess}>
							Iniciar sesión
						</button>
					</li>
					<li>
						<Link className="dropdown-item" href="/gestion/usuarios/alta">
							Registrarse
						</Link>
					</li>
				</>
			)}
		</>
	);
}

// console.log("Datos de sesion:", session);
// useEffect(() => {
// 	if (session != undefined) {
// 		const userId = session.user.id;
// 		console.log(userId);
// 	}
// }, [session]);
