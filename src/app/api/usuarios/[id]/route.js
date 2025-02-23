// app/api/usuarios/route.js

const API_URL = "http://localhost:4000/usuarios";


export async function GET(request, context) {
    const params = await context.params;
    const { id } = params;
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error(`Error al obtener el usuario ID = ${id}`);
        const usuario = await response.json();
        return new Response(JSON.stringify(usuario), { status: 200 });
    } catch (error) {
        console.error(`Error en GET /usuarios/${id}`, error);
        return new Response(`Error al obtener el usuario ID = ${id}`, { status: 500 });
    }
}

export async function PUT(request, context) {
    const params = await context.params;
    const { id } = params;
    try {
        const requestBody = await request.json();
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) throw new Error(`Error al actualizar el usuario ID = ${id}`);
        const usuario = await response.json();
        return new Response(JSON.stringify(usuario), { status: 201 });
    } catch (error) {
        console.error(`Error en PUT /usuarios/${id}`, error);
        return new Response(`Error al actualizar el usuario ID = ${id}`, { status: 500 });
    }
}

export async function PATCH(request, context) {
    const params = await context.params;
    const { id } = params;
    try {
        console.log("ID para el edit desde capa API: ", id);
        const data = await request.json();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Error al editar el usuario");
        const editedUser = await response.json();
        return new Response(JSON.stringify(editedUser), { status: 201 });
    } catch (error) {
        console.error("Error en PATCH /usuarios", error);
        return new Response("Error al editar el usuario", { status: 500 });
    }
}

export async function DELETE(request, context) {
    const params = await context.params;
    const { id } = params;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error(`Error al borrar el usuario ID = ${id}`);
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(`Error en DELETE /usuarios/${id}`, error);
        return new Response(`Error al borrar el usuario ID = ${id}`, { status: 500 });
    }
}
