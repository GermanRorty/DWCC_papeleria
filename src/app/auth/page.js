"use client";
import { syncDBCartToUser, syncUserCartToDB } from "@/lib/services/carrito";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { useEffect, useRef } from "react";

export default function AuthComponent() {
	const { status, data: session } = useSession(); // Desestructura y renombra: data->session
	const { cart, setCart } = useCartContext();

	const logoutProcess = async () => {
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		await syncUserCartToDB(session.user.id, cart);
		signOut();
		localStorage.removeItem("cart");
		// // DEBUG:
		// console.log("Carro antes de cerrar sesion", cart);
	};

	const loginProcess = async () => {
		await signIn();
	};

	// Este hook no es reactivo y permite guardar valores entre renders. Nos servirá para controlar la sincronicidad del carro con el de la bbdd. Sino cada vez que se renderiza este componente, se añaden los elelkentos del carrito guardados en eljsonserver
	const cartAlreadySynced = useRef(false);

	useEffect(() => {
		if (status === "authenticated" && !cartAlreadySynced.current) {
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
				cartAlreadySynced.current = true;
			};
			syncCart();
		}
	}, [session]);

	return (
		<>
			{session ? (
				<li>
					<button className="dropdown-item" onClick={logoutProcess}>Cerrar sesión</button>
				</li>
			) : (
				<>
					<li>
						<button className="dropdown-item" onClick={loginProcess}>Iniciar sesión</button>
					</li>
					<li>
						<Link className="dropdown-item" href="/usuarios/gestion">Registrarse</Link>
					</li>
				</>
			)}
			<li>
				<Link className="dropdown-item" href="#">Ajustes</Link>
			</li>
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
