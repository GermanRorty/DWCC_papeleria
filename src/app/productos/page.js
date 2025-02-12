// app/productos
"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { getProductos } from "@/lib/services/productos";

const ProductsListContext = createContext();

// Display
const Articulo = ({ articleProp }) => {
	const { src, articleId, description, price } = articleProp;
	return (
		<div className="">
			<div>
				{/* Los archivos en public son accesibles desde la raiz => no hace falta ponerlo*/}
				<Image src={`/images/products/${src}`} width={75} height={75} alt={"Picture for article ID = " + articleId} />
			</div>
			<div id="articulo-desc">{price}€</div>
			<div id="articulo-desc">{description}</div>
		</div>
	);
};

const ProductGrid = () => {
	const {productsList, setProductsList} = useContext(ProductsListContext);

	useEffect(() => {
		console.log("Actualización de lista de productos.");
	}, [productsList]);

	if (productsList.length === 0) return <div>"No hay artículos para mostrar"</div>;
	return (
		<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{productsList.map((chosenArticle) => {
				return <Articulo articleProp={chosenArticle} key={chosenArticle.id} />;
			})}
		</div>
	);
};

const ProductosLayout = () => { 
	const[productsList, setProductsList] = useState([]);

	useEffect(() =>{
		const fetchProducts = async() =>{
			const products = await getProductos();
			setProductsList(products);
		};
		fetchProducts();
	},[])

	return (
		<ProductsListContext.Provider value={{productsList, setProductsList}}>
			<div className="flex flex-row">
				{/* // <Filter> */}
				<ProductGrid />
			</div>
		</ProductsListContext.Provider>
	);
};

export default ProductosLayout;
