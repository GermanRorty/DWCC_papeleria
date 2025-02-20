// app/api/usuarios/route.js

const API_URL = "http://localhost:4000/usuarios";

export async function GET(request, context) {
    const params = await context.params;
    const {id} = params;
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok) throw new Error(`Error al obtener el producto ID = ${id}`);
        const producto = await response.json();
        return new Response(JSON.stringify(producto), { status: 200 });

    } catch (error) {
        console.error(`Error en GET /producto/${id}`, error);
        return new Response(`Error al obtener el producto ID = ${id}`, { status: 500 });
    }
};
