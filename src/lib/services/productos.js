// src/lib/services/productos.js

const API_URL = "http://api/productos";

export async function getProductos () {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error("Error al obtener los artículos.");
        return await response.json();
    } catch (error) {
        console.log("Error en función getProductos:", error);
        return [];
    }
};

export async function getProducto(id){
    
};

export async function deleteProducto(){

};
