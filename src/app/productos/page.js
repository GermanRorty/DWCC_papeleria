// app/productos
"use client";

// TODO: Hacer un loader


import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { getProductos } from "@/lib/services/productos";
import { useCartContext } from "../context/CartContext";
import CartAddButton from "@/components/CartAddButton";

const ProductsListContext = createContext();

// Display
const Articulo = ({ articleProp }) => {
	const { imageUrl, name, description, price, id} = articleProp;
	return (
		<div className="">
			<div>
				{/* Los archivos en public son accesibles desde la raiz => no hace falta ponerlo*/}
				<Image src={`/images/products/${imageUrl}`} width={100} height={100} alt={"Picture for article" + {name}} />
			</div>
			<div id="articulo-name">{name}€</div>
			<div id="articulo-price">{price}€</div>
			<div id="articulo-description">{description}</div>
			{console.log("Id para el boton",id)}
			<CartAddButton product={articleProp}/>
		</div>
	);
};

const ProductGrid = () => {
	const {productsList, setProductsList} = useContext(ProductsListContext);

	useEffect(() => {
		// TODO: si de un articulo no quedan existencias que salga en gris 
		console.log("Actualización de lista de productos.");
	}, [productsList]);

	if (productsList.length === 0) return <div>"No hay artículos para mostrar"</div>;
	return (
		<div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{productsList.map((chosenArticle) => {
				return <Articulo articleProp={chosenArticle} key={chosenArticle.id} />;
			})}
		</div>
	);
};

// const Filters = () => {
// 	useEffect(() =>{
// 		const fetchCategories = async() =>{
// 			const products = await getCategories();
// 			setProductsList(products);
// 		};
// 		fetchProducts();
// 	},[])

// 	return(
// 		<div>
// 			<h2>Filtros</h2>
// 			<div>
// 				<div>Categoría</div>
// 				<div>
// 					{categorias.map((cat)=>{
// 						return(
// 							<div></div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

const ProductosLayout = () => { 
	const[productsList, setProductsList] = useState([]);

	useEffect(() =>{
		console.log("ME MONTO UNA VEZ")
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
