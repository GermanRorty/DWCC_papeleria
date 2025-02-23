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
		<Link href={`/gestion/productos/${id}`} className={`btn shadow mt-3`} style={{ backgroundColor: "rgba(229, 216, 165, 1)" }}>
			{" "}
			<div className="w-5 h-6">
				<Lapiz></Lapiz>
			</div>
		</Link>
	);
};

const AddProductButton = () =>{
    return(
        <Link href={"/gestion/productos/alta"} className="btn position-absolute right-4 -translate-y-10 w-fit h-fit p-0 m-0"><i className="bi bi-plus-square w-full fs-2 h-full m-0 p-0"></i></Link>
    );
}

// Display
const Articulo = ({ articleProp }) => {
	const { imageUrl, name, description, price, id, amount } = articleProp;
	return (
		<div className="shadow rounded m-3 p-3 py-1 d-flex w-auto">
			<div className="d-flex flex-col justify-center align-items-center">
				{/* Los archivos en public son accesibles desde la raiz => no hace falta ponerlo*/}
				<Image src={`/images/products/${imageUrl}`} width={80} height={80} alt={"Picture for article" + { name }} />
				<div>
					<EditButton id={id} />
				</div>
			</div>
			<div className="p-2 w-full">
				<div className="d-flex justify-between p-2">
					<div>
						<div id="artizculo-ID">ID: {id}</div>
						<div id="artizculo-name">Nombre: {name}</div>
						<div id="articulo-price">Precio: {price}€</div>
						<div id="articulo-stock">Stock: {amount}</div>
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
		<div className="w-full grid grid-cols-4 position-relative">
            <AddProductButton/>

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

				<ProductGrid filteredList={filteredProducts}>

                </ProductGrid>
				<Filters fullProductsList={productsList} setFilteredList={setFilteredProducts} setFilterApplied={setFilterApplied}></Filters>
			</div>
		</FilteredProductsContext.Provider>
	);
};

export default ProductosLayout;
