// app/api/usuarios/route.js

const API_URL = "http://localhost:4000/usuarios";

export async function GET() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los usuarios");
        const usuarios = await response.json();
        return new Response(JSON.stringify(usuarios), { status: 200 });
    } catch (error) {
        console.error("Error en GET /productos:", error);
        return new Response("Error al obtener los usuarios", { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const productName = formData.get("name");
        const price = formData.get("precio");
        const description = formData.get("descripcion");
        const src = formData.get("imagen");
        const category = formData.get("categoria");

        
        const response = await fetch(`${API_URL}`, {
            method: POST,
            body: formData,
        });
        if (!response.ok) {
            if (response.status === 400) throw new Error("Datos incorrectos");
            if (response.status === 409) throw new Error("Producto ya existe");
            throw new Error("Error desconocido");
        }
        const producto = await response.json();
        return new Response(JSON.stringify(producto), {
            status: 201, 
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error en POST /producto", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: error.message.includes("Producto ya existe" || "Datos incorrectos") ? 409 : 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}