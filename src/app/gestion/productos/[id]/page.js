// app/productos/gestion

"use client";

import DropEntityFromDBButton from "@/components/DropEntityFromDBButton";
import DynamicForm from "@/components/DynamicForm";
import { editProductFromDatabase, getProducto, saveProductToDatabase, uploadProductImgFs } from "@/lib/services/productos";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
		type: "string",
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
		name: "imgFile",
		label: "Imagen",
		type: "file",
		validators: [
			{
				// TODO: REvisar aviso de errores, porque no se están mostrando al superar el peso o elegir otro tipo de archivo
				key: "validate",
				value: (fileList) => {
					if (fileList?.length){
						const file = fileList[0];
						if (!file.type.startsWith("image/")) return "Sólo se permiten imágenes.";
						if (file.size > 1024 * 1024 * 6) return "La imagen no puede pesar más de 6 MB.";
					}
					return true;
				},
				errmssg: "",
			},
		],
	},
];

const ProductManagementForm = ({productData, setFunction}) => {
	const submitForm = async (data) => {
		try {
			// Enviar datos del producto a la API (sin imagen)
			const dataWithId ={...data, id: productData.id, imageUrl: productData.imageUrl}
			const productId = await editProductFromDatabase(dataWithId); // Este data es un objeto normal con la informacion del formulario

			// Subir la imagen con el productId
			if (data.imgFile && data.imgFile[0]) {
				// // DEBUG:
				// console.log(data.imgFile[0]);
				const imageUrl = await uploadProductImgFs(productId, data.imgFile[0]); // Llamamos a uploadImage
			}

			setFunction(dataWithId);

		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<h5>Datos del producto</h5>
			<DynamicForm attributes={productFields} submitFunction={submitForm} formItemData={productData} />
		</div>
	);
};

const ProductManagement = () => {
	const [product, setProduct] = useState(null);
	const { data: session, setSession } = useSession();
	const { id } = useParams();
	const router = useRouter();

	if (session?.user?.rol === "common-user") router.push("/");

	useEffect(() => {
		const fetchProduct = async () => {
			const productFound = await getProducto(id);
			setProduct(productFound);
		};
		fetchProduct();
	}, [id, ]);

	if (!product) {
		return <div>Loading...</div>; //  O cualquier otro indicador de carga

	}

	return (
		<div>
			<div className="d-flex gap-6">
				<Image alt="product picture" src={`/images/products/${product.imageUrl}`} width={500} height={500}></Image>
				<div className="d-flex align-items-center gap-20">
					<ProductManagementForm productData={product} setFunction={setProduct}/>
					<div>
						<DropEntityFromDBButton entityId={product.id} entityClass={"product"}></DropEntityFromDBButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductManagement;
