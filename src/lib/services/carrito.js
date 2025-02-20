// src/lib/services/carrito.js

const API_USER_URL = "http://localhost:3000/api/usuarios";



export async function syncUserCartToDB(userId, cart){
	try {
        const cartResponse = await fetch(`${API_USER_URL}/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({cart}),
        });

        if (!cartResponse.ok) {
            throw new Error("Error al guardar el carrito en BBDD.");
        }

        // Obtener el ID del producto guardado
        const updatedUser = await cartResponse.json();

        return updatedUser; // Devolver el ID del producto
    } catch (error) {
        console.error("Error en syncUserCartToDB:", error);
        throw error; // Propagar el error
    }
}
