// app/api/usuarios/route.js

const API_URL = "http://localhost:4000/usuarios";

export async function GET() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Error al obtener los usuarios");
		const usuarios = await response.json();
		return new Response(JSON.stringify(usuarios), { status: 200 });
	} catch (error) {
		console.error("Error en GET /usuarios:", error);
		return new Response("Error al obtener los usuarios", { status: 500 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();

		const response = await fetch(`${API_URL}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
			// Debemos especificar en este caso que solo será del tipo json, sino espera un multipart/form-data
		});
		if (!response.ok) {
			if (response.status === 400) throw new Error("Datos incorrectos");
			if (response.status === 409) throw new Error("Usuario ya existe");
			throw new Error("Error desconocido");
		}
		const usuario = await response.json();
		return new Response(JSON.stringify(usuario), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error en POST /usuario", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: error.message.includes("Producto ya existe" || "Datos incorrectos") ? 409 : 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
