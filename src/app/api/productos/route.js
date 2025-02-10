// app/api/productos/route.js

// Debemos especificar como nombre de función el tipo de solicitud HTTP que queremos que realice

const API_URL = "http://localhost:4000/productos";

export async function GET() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Error al obtener los productos");
		const productos = await response.json();
		return new Response(JSON.stringify(productos), { status: 200 });
	} catch (error) {
		console.error("Error en GET /productos:", error);
		return new Response("Error al obtener los productos", { status: 500 });
	}
}

// LESSON: Aunque es el POST de un articulo concreto, aun no contamos con su ID, por lo que va en la ruta general
// LESSON: Si sólo mandásemos datos planos, podríamos hacerlo en forma de objeto por cabecera (y pasarlo directamente al body con JSON.stringify(datosProducto)). Como incluiremos la imagen del artículo, usamos formData
export async function POST(request) {
	try {
		const formData = await request.formData();
        const productName = await formData.get 
		const response = await fetch(`${API_URL}`, {
			method: POST,
			body: formData,
		});
		if (!response.ok) throw new Error(`Error al obtener el producto ID = ${id}`);
		const producto = await response.json();
		return new Response(JSON.stringify(producto), { status: 200 });
	} catch (error) {
		console.error(`Error en GET /producto/${id}`, error);
		return new Response(`Error al obtener el producto ID = ${id}`, { status: 500 });
	}
}
