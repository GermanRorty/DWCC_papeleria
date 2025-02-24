"use client";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { useScrollYContext } from "./ScrollYContext";
import CartDeleteButton from "@/components/CartDeleteButton";
import OnClickPressButton from "@/components/OnClickPressButton";
import CartRemoveButton from "@/components/CartRemoveButton";
import CartPaymentButton from "@/components/CartPaymentButton";


const CartContext = createContext();

// Creamos un proveedor que servirá para envolver todos los componentes que queramos estén dentro del contexto. Redirige a un CartContext.Provider
export const CartContextProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [displayCart, setDisplayCart] = useState(false);
	const [compraHecha, setCompraHecha] = useState(false);
	const [cartSynced, setCartSynced] = useState(false);
	const { scrollingY, setScrollingY } = useScrollYContext();

	// Al cargar el componente actualizamos el carro con lo almacenado en localStorage. Esperamos a que este cargado por si el componente intenta acceder a localStorage antes de que esté disponible
	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
	}, []);

	// El contexto es más inmediato y cómodo para manipular el carro. Cada vez que haya un cambio en él, se actualizará el localStorage (persistencia)
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);


	return (
		<CartContext.Provider value={{ cart, setCart, displayCart, setDisplayCart, compraHecha, setCompraHecha, cartSynced, setCartSynced }}>
			{children}
			<div
				className={`flex-col d-flex position-fixed bg-white rounded-s-lg ${scrollingY ? "top-28 h-5/6 " : "top-72 h-3/5 "} right-0 ${
					displayCart ? "translate-x-0" : "translate-x-full"
				}  w-25 shadow overflow-y-auto transition-all ease-linear duration-200`}
			>
				<CartDeleteButton />
				

				{cart.map(({ id, name, quantity, imageUrl, price, amount }) => {
					if (typeof cart[0] === "string") return cart[0];

					return (
						<div key={id} className="m-3 d-flex justify-between">
							<div>
								<Image src={`/images/products/${imageUrl}`} width={100} height={100} alt={"Picture for article" + { name }} />
								{name} - Cantidad: {quantity}- Existencias: {amount}
								<br/>
								Precio total: {(Math.round(quantity * price * 100) / 100).toFixed(2)}€
							</div>
							<div className="d-flex flex-col right-0 justify-center align-items-center">
								<div className="d-flex gap-1">
								<OnClickPressButton sign={-1} id={id} text={"-"}></OnClickPressButton>
								<OnClickPressButton sign={1} id={id} text={"+"}></OnClickPressButton>
								</div>
								<CartRemoveButton productId={id} />
							</div>
						</div>
					);
				})}
				<CartPaymentButton />
			</div>
		</CartContext.Provider>
	);
};

// Esto permite usar los valores dentro del useContext(CartContext) desde algún componente que esté envuelto por CartProvider
export const useCartContext = () => useContext(CartContext);
