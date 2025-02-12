// app/productos
"use client";

import Image from "next/image";
import { useEffect } from "react";
import getProductos from "@/lib/services/productos";

// Display
const Articulo = ({ articleProp }) => {
	const { src, articleId, description } = articleProp;
	return (
		<div className="">
			<div>
				<Image src={src} width={500} height={500} alt={"Picture for article ID = " + articleId} />
			</div>
			<div id="articulo-desc">{description}</div>
		</div>
	);
};

const ProductGrid = ({ productsList }) => {
	useEffect(() => {
		console.log("Actualización de lista de productos.");
	}, [productsList]);

	if (productsList.length===0) return <div>"No hay artículos para mostrar"</div>;
	return (
		<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{productsList.map((chosenArticle) => {
				return <Articulo articleProp={chosenArticle} key={chosenArticle.id} />;
			})}
		</div>
	);
};

const ProductosLayout = () => {
	return (
		<div className="flex flex-row">
			{/* // <Filter> */}
			<ProductGrid/>
		</div>

	);
};

export default ProductosLayout;
