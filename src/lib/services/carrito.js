// src/lib/services/carrito.js

const API_USER_URL = "http://localhost:3000/api/usuarios";



export async function syncUserCartToDB(userId, cart){
	try {
        // // DEBUG:
        // console.log("Carro antes de sincronizar", cart);
        const cartResponse = await fetch(`${API_USER_URL}/${userId}/carro`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
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

export async function syncDBCartToUser(userId){
    try {
        // JSON no soporta nativamente devolver directamente un atributo de un objeto. Recuperamos el objeto y de él el atributo -> objeto.atributo 
        const response = await fetch(`${API_USER_URL}/${userId}`);
        if(!response.ok){
            throw new Error("Error al recuperar el carrito de la BBDD."); 
        }

        const retrievedUser = await response.json();
        const retrievedCart = retrievedUser.cart;
        return retrievedCart;
    } catch (error) {
        
    }
}