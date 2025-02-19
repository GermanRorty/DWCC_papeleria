// app/productos/gestion

"use client";

import { saveProductToDatabase, uploadProductImgFs } from "@/lib/services/productos";
import { useForm } from "react-hook-form";

const ManagementForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const submitForm = async (data) => {
    try {
        // Enviar datos del producto a la API (sin imagen)
		const productId = await saveProductToDatabase(data);

        // Subir la imagen con el productId
		let imageUrl = "";
        if (data.imgFile && data.imgFile[0]) {
			// DEBUG:
			console.log(data.imgFile[0]);
            imageUrl = await uploadProductImgFs(productId, data.imgFile[0]); // Llamamos a uploadImage
        }
        // Actualizar el producto con la URL de la imagen
        await fetch(`http://localhost:4000/productos/${productId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl }),
        });

        console.log("Producto guardado con imagen:", productId, imageUrl);

    } catch (error) {
        console.error("Error:", error);
    }
};

	return (
		<div>
			<div>Datos del producto</div>
			<form onSubmit={handleSubmit(submitForm)}>
				<div>
					<label htmlFor="name">Nombre:</label>
					<input className="text-black" type="text" id="name" {...register("name", { required: true, maxLength: 128 })}/>
					{/* LESSON: errors.description será un objeto, y su propiedad type indicará el tipo de error */}
					{errors.name?.type === "required" && <p>Este campo es obligatorio</p>}
					{errors.name?.type === "maxLength" && <p>El nombre no puede exceder los 128 caracteres</p>}
				</div>
				<div>
					<label htmlFor="price">Precio:</label>
					<input className="text-black" type="number" id="price" {...register("price", { required: true, maxLength: 512 })}/>
					{errors.price?.type === "required" && <p>Este campo es obligatorio</p>}
					{errors.price?.type === "maxLength" && <p>La descripción no puede exceder los 512 caracteres</p>}
				</div>
				<div>
					<label htmlFor="amount">Stock:</label>
					<input className="text-black" type="number" id="amount" {...register("amount", { required: true, min: 0 })}/>
					{errors.amount?.type === "required" && <p>Este campo es obligatorio</p>}
				</div>
				<div>
					<label htmlFor="description">Descripción:</label>
					<input className="text-black" type="text" id="description" {...register("description", { required: true, maxLength: 1024 })}/>
					{errors.description?.type === "required" && <p>Este campo es obligatorio</p>}
					{errors.description?.type === "maxLength" && <p>La descripción no puede exceder los 1024 caracteres</p>}
				</div>
				<div>
					<label htmlFor="imgFile"></label>
					<input
						type="file"
						id="imgFile"
						// LESSON: En input[type="file"] el valor del input es un objeto FileList. validate permite crear validaciones personalizadas
						{...register("imgFile", {
							required: true,
							validate: (value) => {
								// LESSON: .type en este caso devuelve el MIME del archivo. Para imagenes: image/jpeg, image/png, etc
								if (!value[0].type.startsWith("image/")) return "Sólo se permiten imágenes.";
								if (value[0].size > 1024 * 1024 * 6) return "La imagen no puede pesar más de 6 MBs";
								return true;
							},
						})}
					/>
					{errors.imgFile?.type === "required" && <p>Este campo es obligatorio</p>}
					{errors.imgFile?.type === "validate" && <p>{errors.imgFile.message}</p>}
				</div>
                <input type="submit"/>
			</form>
		</div>
	);
};

const ProductManagement = () => {
	return <ManagementForm />;
};

export default ProductManagement;
