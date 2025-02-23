// src/lib/services/carrito.js

const API_URL_USER = "http://localhost:3000/api/usuarios";


export async function getAllUsers(){
    try {
        const response = await fetch(API_URL_USER);
        if (!response.ok) throw new Error("Error al obtener los usuarios.");
		return await response.json();
	} catch (error) {
		console.log("Error en función getAllUsers:", error);
		return [];
	}
}


export async function getUser(id){
    try {
        const response = await fetch(`${API_URL_USER}/${id}`);
        if (!response.ok) throw new Error(`Error al obtener el usuario ID=${id}`);
		return await response.json();
	} catch (error) {
		console.log(`Error en función getUser(${id})`, error);
		return [];
	}
}

// TODO: hacer que compruebe primero si se puede conectar a la bbdd
export async function addNewUser(data){
    try {
        const userResponse  = await fetch(API_URL_USER,{
            method:"POST",
            body: JSON.stringify(data),
        });

        if(!userResponse.ok){
            throw new Error("Error al guardar el usuario")
        }

        const userCreated = await userResponse.json();

        return userCreated;
    } catch (error) {
        console.error("Error en addNewUser:", error);
        throw error; 
    }
}

export async function editUser(data){
    try {
        const userResponse  = await fetch(`${API_URL_USER}/${data.id}`,{
            method:"PATCH",
            body: JSON.stringify(data),
        });

        if(!userResponse.ok){
            throw new Error("Error al editar el usuario")
        }

        const userEdited = await userResponse.json();

        return userEdited;
    } catch (error) {
        console.error("Error en editUser:", error);
        throw error; 
    }
}

export async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL_USER}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", // Indicamos que el contenido es JSON
            },
        });
        if (!response.ok) throw new Error(`Error al borrar el usuario ID=${id}`);
        return await response.json();
    } catch (error) {
        console.log(`Error en función deleteUser(${id})`, error);
        return [];
    }
}

