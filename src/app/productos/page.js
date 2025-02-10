// app/productos
"use client";

import Image from "next/image";
import { useEffect } from "react";

const Articulo = ({ src, articleId, description }) => {
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

	return (
		<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{productsList.map((article) => {
				return <Articulo src={article.imgSrc} articleId={article.id} description={article.description} />;
			})}
		</div>
	);
};

const ProductosLayout = () => {
	return <div>Hola</div>;
};

export default ProductosLayout;
