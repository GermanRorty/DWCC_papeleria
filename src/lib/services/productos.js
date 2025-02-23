// src/lib/services/productos.js

const API_URL_PRODUCT = "http://localhost:3000/api/productos";
const API_URL_UPLOAD_IMG = "http://localhost:3000/api/upload";

export async function getProductos() {
	try {
		const response = await fetch(API_URL_PRODUCT);
		if (!response.ok) throw new Error("Error al obtener los artículos.");
		return await response.json();
	} catch (error) {
		console.log("Error en función getProductos:", error);
		return [];
	}
}

export async function getProducto(id) {
	try {
		const response = await fetch(`${API_URL_PRODUCT}/${id}`);
		if (!response.ok) throw new Error(`Error al obtener el artículo ID=${id}`);
		return await response.json();
	} catch (error) {
		console.log(`Error en función getProducto(${id})`, error);
		return [];
	}
}

export async function deleteProducto(id) {
	try {
		const response = await fetch(`${API_URL_PRODUCT}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json", // Indicamos que el contenido es JSON
			},
		});
		if (!response.ok) throw new Error(`Error al borrar el artículo ID=${id}`);
		return await response.json();
	} catch (error) {
		console.log(`Error en función deleteProducto(${id})`, error);
		return [];
	}
}

export async function saveProductToDatabase(data) {
	// // DEBUG:
	// console.log("Data: ", data);
	const { imgFile, ...dataNoImgFile } = data;
	try {
		// Enviar datos del producto a la API (sin imagen)
		const productResponse = await fetch(API_URL_PRODUCT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dataNoImgFile),
		});

		if (!productResponse.ok) {
			throw new Error("Error al guardar el producto.");
		}

		// Obtener el ID del producto guardado
		const { productId } = await productResponse.json();

		return productId; // Devolver el ID del producto
	} catch (error) {
		console.error("Error en saveProductToDatabase:", error);
		throw error; // Propagar el error
	}
}

export async function uploadProductImgFs(productId, imgFile) {
	try {
		// // DEBUG:
		// console.log(imgFile);
		const formData = new FormData();
		formData.append("productId", productId); // Enviar el ID
		formData.append("image", imgFile);

		const uploadResponse = await fetch(API_URL_UPLOAD_IMG, {
			method: "POST",
			body: formData,
		});

		if (!uploadResponse.ok) {
			throw new Error("Error al subir la imagen.");
		}

		const { imageUrl } = await uploadResponse.json();

		return imageUrl;
	} catch (error) {
		console.error("Error en uploadProductImgFs:", error);
		throw error; 
	}
}

// TODO: hacer update img

export async function editProductFromDatabase(data) {
	// // DEBUG:
	// console.log("Data: ", data);
	const { imgFile, ...dataNoImgFile } = data;
	try {
		// DEBUG: 
		console.log("ID para edit desde",dataNoImgFile.id);
		const productResponse = await fetch(`${API_URL_PRODUCT}/${dataNoImgFile.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dataNoImgFile),
		});

		if (!productResponse.ok) {
			throw new Error("Error al editar el producto.");
		}

		const editedProduct = await productResponse.json();

		return editedProduct.id; 
	} catch (error) {
		console.error("Error en editProductFromDatabase:", error);
		throw error; 
	}
}
