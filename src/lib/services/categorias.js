


const API_URL_CATEGORY = "http://localhost:3000/api/categorias";

export async function getCategories() {
    try {
        const response = await fetch(API_URL_CATEGORY);
        if (!response.ok) throw new Error("Error al obtener las categorías.");
        return await response.json();
    } catch (error) {
        console.log("Error en función getCategories:", error);
        return [];
    }
}