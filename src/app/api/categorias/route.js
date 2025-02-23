const API_URL = "http://localhost:4000/categorias";

export async function GET() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Error al obtener las categorias");
		const categorias = await response.json();
		return new Response(JSON.stringify(categorias), { status: 200 });
	} catch (error) {
		console.error("Error en GET /categorias:", error);
		return new Response("Error al obtener las categorias", { status: 500 });
	}
}