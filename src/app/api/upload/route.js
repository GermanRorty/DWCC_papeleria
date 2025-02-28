// app/api/upload/route.js

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
  try {
    // Extraer los datos del formData
    const formData = await req.formData();
    const productId = formData.get("productId");
    const file = formData.get("image");

    // Validaciones
    if (!productId) {
      return NextResponse.json(
        { error: "Falta el ID del producto" },
        { status: 400 }
      );
    }
    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo" },
        { status: 400 }
      );
    }

    // Definir la ruta de la carpeta de subida
    const uploadDir = path.join(process.cwd(), "public/images/products");

    // Asegurar que la carpeta existe (si no, la crea)
    await fs.mkdir(uploadDir, { recursive: true });

    // Obtener la extensión del archivo (utilizamos file.name)
    const ext = path.extname(file.name);
    const fileName = `${productId}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Convertir el archivo a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Escribir el archivo en disco
    await fs.writeFile(filePath, buffer);

    // Construir la URL para acceder a la imagen
    const imageUrl = fileName;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    const formData = await req.formData();
    const productId = formData.get("productId");
    const file = formData.get("image");

    if (!productId) {
      return NextResponse.json({ error: "Falta el ID del producto" }, { status: 400 });
    }
    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/images/products");
    const ext = path.extname(file.name);
    const fileName = `${productId}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Verificar si el archivo ya existe antes de sobrescribirlo
    try {
      await fs.access(filePath);
    } catch (err) {
      return NextResponse.json({ error: "La imagen no existe" }, { status: 404 });
    }

    // Sobrescribir el archivo existente
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ imageUrl: fileName });
  } catch (error) {
    console.error("Error al actualizar la imagen:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}