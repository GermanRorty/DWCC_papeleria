"use client";

import { getProductos } from "@/lib/services/productos";
import { useCartContext } from "./CartContext";

const { createContext, useState, useContext, useEffect } = require("react");

const ProductsListContext = createContext();

export const ProductsListContextProvider = ({ children }) => {
	const [productsList, setProductsList] = useState([]);
	const { compraHecha, setCompraHecha } = useCartContext();
	const [edicionHecha, setEdicionHecha] = useState(false);

	useEffect(() => {
		// // DEBUG:
		// console.log("ME MONTO UNA VEZ");
		const fetchProducts = async () => {
			const products = await getProductos();
			setProductsList(products);
		};
		fetchProducts();
		setCompraHecha(false);
	}, [compraHecha]);

	useEffect(() => {
		if (edicionHecha) {
			const fetchProducts = async () => {
				const products = await getProductos();
				setProductsList(products);
			};
			fetchProducts();
			setEdicionHecha(false);
		}
	}, [edicionHecha]);

	return <ProductsListContext.Provider value={{ productsList, setProductsList, edicionHecha, setEdicionHecha }}>{children}</ProductsListContext.Provider>;
};

export const useProductsListContext = () => useContext(ProductsListContext);
