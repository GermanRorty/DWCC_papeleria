// app/api/productos/[id]/route.js

const API_URL = "http://localhost:4000/productos";

export async function GET(request, context) {
    // LESSON: Es lo mismo que hacer const id = params.id; request.params no existe en los manejadores de rutas de Next.js 15+ 
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


export async function PUT(request,context) {
    const params = await context.params;
    const {id} = params;
    try {
        const requestBody = await request.json();

        const response = await fetch(`${API_URL}/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(requestBody),
        });
        if(!response.ok) throw new Error(`Error al actualizar el producto ID = ${id}`);
        const producto = await response.json();
        return new Response(JSON.stringify(producto), { status: 201 });

    } catch (error) {
        console.error(`Error en PUT /producto/${id}`, error);
        return new Response(`Error al obtener el producto ID = ${id}`, { status: 500 });
    }
};

// Peticion http para modificar el carrito del usuario
export async function PATCH(request, context) {
    const params = await context.params; // En las Api Routes params tiene que estar disponible (hay que esperar)
    const { id } = params;

    try {
        // DEBUG 
        console.log("ID para el edit desde capa API: ",id);
        const data = await request.json();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Error al editar el producto");
        const editedProduct = await response.json();
        return new Response(JSON.stringify(editedProduct), { status: 201 });
    } catch (error) {
        console.error("Error en PATCH /producto", error);
        return new Response("Error al obtener el producto", { status: 500 });
    }
};

export async function DELETE(request, context) {
    const params = await context.params;
    const {id} = params;
    try {
        const response = await fetch(`${API_URL}/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json', 
            },            
        });
        if(!response.ok) throw new Error(`Error al borrar el producto ID = ${id}`);
        return new Response(null, { status: 204 });

    } catch (error) {
        console.error(`Error en DELETE /producto/${id}`, error);
        return new Response(`Error al borrar el producto ID = ${id}`, { status: 500 });
    }
};


