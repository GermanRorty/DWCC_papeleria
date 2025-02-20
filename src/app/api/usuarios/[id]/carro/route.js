// app/api/usuarios/[id]/carro/route.js

const API_URL = "http://localhost:4000/usuarios";


// Peticion http para modificar el carrito del usuario
export async function PATCH(request, context) {
	const params = await context.params; // En las Api Routes params tiene que estar disponible (hay que esperar)
	const { id } = params;

	try {
		const cart = await request.json();
		// DEBUG::
		console.log("Cart es un ARRAY?", Array.isArray(cart));
		const response = await fetch(`${API_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({cart}),
		});

		if (!response.ok) throw new Error("Error al editar el usuario");
		const editedUser = await response.json();
		return new Response(JSON.stringify(editedUser), { status: 201 });
	} catch (error) {
		console.error("Error en PATCH /usuario", error);
		return new Response("Error al obtener el usuario", { status: 500 });
	}
}
