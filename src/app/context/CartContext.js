"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// Creamos un proveedor que servirá para envolver todos los componentes que queramos estén dentro del contexto. Redirige a un CartContext.Provider
export const CartContextProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
    const [displayCart, setDisplayCart] = useState(false);
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
		<CartContext.Provider value={{ cart, setCart, displayCart, setDisplayCart }}>
			{children}
			<div style={{ display: displayCart ? "block" : "none" }}>
				{cart.map(({ id, name, quantity }) => {
					return (
						<div key={id}>
							<p>
								{name} - Cantidad: {quantity}
							</p>
						</div>
					);
				})}
			</div>
		</CartContext.Provider>
	);
};

// Esto permite usar los valores dentro del useContext(CartContext) desde algún componente que esté envuelto por CartProvider
export const useCartContext = () => useContext(CartContext);
