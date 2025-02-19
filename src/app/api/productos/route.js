// app/api/productos/route.js

import { NextResponse } from "next/server";

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
export async function POST(req) {
	try {
		const productData = await req.json();
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });
		if (!response.ok) {
			throw new Error("Error al guardar el producto en la base de datos.");
		}
		const product = await response.json();
		return NextResponse.json({productId:product.id});
	} catch (error) {
		console.error("Error en POST /producto", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

