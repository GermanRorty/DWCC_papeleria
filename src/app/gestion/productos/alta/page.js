// app/productos/gestion

"use client";

import DynamicForm from "@/components/DynamicForm";
import { getCategories } from "@/lib/services/categorias";
import { saveProductToDatabase, uploadProductImgFs } from "@/lib/services/productos";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

const ProductManagementForm = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		// Obtener categorías desde la API
		const fetchCategories = async () => {
			const categoriesList = await getCategories();
			setCategories(categoriesList);
		};
		fetchCategories();
	}, []);

	const productFields = [
		{
			name: "name",
			label: "Nombre",
			type: "text",
			validators: [
				{ key: "required", value: true, errmssg: "El nombre es obligatorio" },
				{ key: "maxLength", value: 256, errmssg: "Máximo 256 caracteres" },
			],
		},
		{
			name: "price",
			label: "Precio",
			type: "text",
			validators: [
				{ key: "required", value: true, errmssg: "El precio es obligatorio" },
				{ key: "min", value: 1, errmssg: "El precio debe ser mayor a 0" },
			],
		},
		{
			name: "amount",
			label: "Stock",
			type: "number",
			validators: [
				{ key: "required", value: true, errmssg: "El stock es obligatorio" },
				{ key: "min", value: 0, errmssg: "El stock no puede ser negativo" },
			],
		},
		{
			name: "description",
			label: "Descripción",
			type: "text",
			validators: [
				{ key: "required", value: true, errmssg: "La descripción es obligatoria" },
				{ key: "maxLength", value: 1024, errmssg: "Máximo 1024 caracteres" },
			],
		},
		{
			name: "categoryId",
			label: "Categoría",
			type: "select",
			options: categories.map((category) => ({
				value: category.id,
				text: category.nombre.charAt(0).toUpperCase() + category.nombre.slice(1),
			})),
			validators: [{ key: "required", value: true, errmssg: "La categoría es obligatoria" }],
		},
		{
			name: "imgFile",
			label: "Imagen",
			type: "file",
			validators: [
				{ key: "required", value: true, errmssg: "La imagen es obligatoria" },
				{
					key: "validate",
					value: (fileList) => {
						if (!fileList.length) return "La imagen es obligatoria";
						const file = fileList[0];
						if (!file.type.startsWith("image/")) return "Sólo se permiten imágenes.";
						if (file.size > 1024 * 1024 * 6) return "La imagen no puede pesar más de 6 MB.";
						return true;
					},
					errmssg: "",
				},
			],
		},
	];

	const submitForm = async (data, reset) => {
		try {
			// Enviar datos del producto a la API (sin imagen)
			const productId = await saveProductToDatabase(data); // Este data es un objeto normal con la informacion del formulario

			// Subir la imagen con el productId
			let imageUrl = "";
			if (data.imgFile && data.imgFile[0]) {
				// // DEBUG:
				// console.log(data.imgFile[0]);
				imageUrl = await uploadProductImgFs(productId, data.imgFile[0]); // Llamamos a uploadImage
			}
			// Actualizar el producto con la URL de la imagen
			await fetch(`http://localhost:4000/productos/${productId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ imageUrl }), //El servidor debe tener una propiedad llamada imageUrl en el objeto del producto para poder actualizar esa propiedad correctamente.
			});

			console.log("Producto guardado con imagen:", productId, imageUrl);
			toast.success("Producto agregado a la tienda", {
				autoClose: 4000,
				hideProgressBar: true,
				position: "bottom-right",
				transition: Slide,
				icon: false,
			});
			reset();
		} catch (error) {
			console.error("Error:", error);
            toast.error("No se ha podido dar de alta el producto", {
				autoClose: 4000,
				hideProgressBar: true,
				position: "bottom-right",
				transition: Slide,
				icon: false,
                className: "custom-error-toast", 

			});
		}
	};

	return (
		<div className="w-full d-flex flex-col justify-center align-items-center">
			<h5>Datos del producto</h5>
			<DynamicForm attributes={productFields} submitFunction={submitForm} />
		</div>
	);
};

const ProductManagement = () => {
	const { data: session, setSession } = useSession();
	const { id } = useParams();
	const router = useRouter();

	if (session?.rol === "common-user") router.push("/");

	return <ProductManagementForm />;
};

export default ProductManagement;
