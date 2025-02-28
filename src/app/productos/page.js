// app/productos
"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { getProductos } from "@/lib/services/productos";
import { useCartContext } from "../context/CartContext";
import CartAddButton from "@/components/CartAddButton";
import { getCategories } from "@/lib/services/categorias";
import { useProductsListContext } from "../context/ProductsContext";
import Filters from "@/components/Filters";

const FilteredProductsContext = createContext();

// Display
const Articulo = ({ articleProp }) => {
	const { imageUrl, name, description, price, id } = articleProp;
	const [src, setSrc] = useState(`/images/products/${imageUrl}`);

	return (
		<div className="max-h-52 shadow rounded m-3 p-3 d-flex justify-center align-items-center w-auto" style={articleProp.amount === 0 ? { filter: "grayscale(100%)" } : {}}>
			<div className=" justify-center">
				{/* Los archivos en public son accesibles desde la raiz => no hace falta ponerlo*/}
				<Image
					src={src}
					width={100}
					height={100}
					alt={`Picture for article ${name}`}
					onError={() => setSrc("/images/default-picture.png")}
				/>{" "}
			</div>
			<div className="p-2 w-full">
				<div className="d-flex justify-between p-2">
					<div>
						<div id="articulo-name">{name}</div>
						<div id="articulo-price">{parseFloat(price).toFixed(2)}€</div>
					</div>
					<div>
						<CartAddButton product={articleProp} />
					</div>
				</div>

				<div id="articulo-description" className="border-top p-2 m-1 w-full">
					{description}
				</div>
			</div>
		</div>
	);
};

const ProductGrid = ({ filteredList }) => {
	const { productsList, setProductsList } = useProductsListContext();

	useEffect(() => {
		// TODO: si de un articulo no quedan existencias que salga en gris
		// // DEBUG:
		// console.log("Actualización de lista de productos.");
	}, [filteredList]);

	if (filteredList.length === 0) return <div className="w-full">"No hay artículos para mostrar"</div>;
	return (
		<div className="w-full grid grid-cols-3">
			{filteredList.map((chosenArticle) => {
				return <Articulo articleProp={chosenArticle} key={chosenArticle.id} />;
			})}
		</div>
	);
};

const ProductosLayout = () => {
	const { productsList, setProductsList } = useProductsListContext();
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [filterApplied, setFilterApplied] = useState(false);

	useEffect(() => {
		if (!filterApplied) {
			setFilteredProducts(productsList);
		}
	}, [filterApplied, productsList]);

	return (
		<FilteredProductsContext.Provider value={(filteredProducts, setFilteredProducts, filterApplied, setFilterApplied)}>
			<div className="flex flex-row">
				<ProductGrid filteredList={filteredProducts} />
				<Filters fullProductsList={productsList} setFilteredList={setFilteredProducts} setFilterApplied={setFilterApplied}></Filters>
			</div>
		</FilteredProductsContext.Provider>
	);
};

export default ProductosLayout;
