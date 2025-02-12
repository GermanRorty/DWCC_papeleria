// src/lib/services/productos.js

const API_URL = "http://api/productos";

export async function getProductos() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Error al obtener los artículos.");
		return await response.json();
	} catch (error) {
		console.log("Error en función getProductos:", error);
		return [];
	}
}

export async function getProducto(id) {
	try {
		const response = await fetch(`${API_URL}/${id}`);
		if (!response.ok) throw new Error(`Error al obtener el artículo ID=${id}`);
		return await response.json();
	} catch (error) {
		console.log(`Error en función getProducto(${id})`, error);
		return [];
	}
}

export async function deleteProducto(id) {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
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
