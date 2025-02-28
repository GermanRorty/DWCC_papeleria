// app/productos
"use client";

import { useProductsListContext } from "@/app/context/ProductsContext";
import CartAddButton from "@/components/CartAddButton";
import Filters from "@/components/Filters";
import Lapiz from "@/components/iconos/Lapiz";
import Image from "next/image";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";

const FilteredProductsContext = createContext();

const EditButton = ({ id }) => {
	return (
		<Link href={`/Gestion/Productos/${id}`} className={`btn shadow mt-3`} style={{ backgroundColor: "rgba(229, 216, 165, 1)" }}>
			{" "}
			<div className="w-5 h-6">
				<Lapiz></Lapiz>
			</div>
		</Link>
	);
};

const AddProductButton = () => {
	return (
		<Link
			href={"/Gestion/Productos/Alta"}
			className="link-hover-addentitybutton position-absolute right-4 -translate-y-10 w-fit h-fit p-0 m-0"
		>
			<i className="bi bi-plus-square w-full fs-2 h-full m-0 p-0"></i>
		</Link>
	);
};

// Display
const Articulo = ({ articleProp }) => {
	const { imageUrl, name, description, price, id, amount } = articleProp;

	const [src, setSrc] = useState(`/images/products/${imageUrl}`);

	// Condición para aplicar el filtro gris
	const stockIsZero = amount === 0;

	return (
		<div className={`shadow rounded max-h-52 m-3 p-3 d-flex w-auto ${stockIsZero ? "filter grayscale" : ""}`}>
			<div className="d-flex flex-col justify-center align-items-center">
				{/* Los archivos en public son accesibles desde la raiz => no hace falta ponerlo*/}
				<Image
					src={src}
					width={80}
					height={80}
					alt={`Picture for article ${name}`}
					onError={() => setSrc("/images/default-picture.png")}
				/>{" "}
				<div>
					<EditButton id={id} />
				</div>
			</div>
			<div className="d-flex justify-center alignt-items-center p-2 w-full">
				<div className="d-flex flex-col justify-center alignt-items-center">
					<div id="artizculo-ID">
						<strong>ID:</strong> {id}
					</div>
					<div id="artizculo-name">
						<strong>Nombre:</strong> <div className="text-start">{name}</div>
					</div>
					<div id="articulo-price">
						<strong>Precio:</strong> {parseFloat(price).toFixed(2)}€
					</div>
					<div id="articulo-stock">
						<strong>Stock:</strong> {amount}
					</div>
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
		<div className="w-full grid z-0 grid-cols-5 position-relative">
			<AddProductButton />

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
				<ProductGrid filteredList={filteredProducts}></ProductGrid>
				<Filters fullProductsList={productsList} setFilteredList={setFilteredProducts} setFilterApplied={setFilterApplied}></Filters>
			</div>
		</FilteredProductsContext.Provider>
	);
};

export default ProductosLayout;
