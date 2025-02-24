This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Resources: 
- Icons: https://www.svgrepo.com/collection/office-material-5/
- Icons : https://www.svgrepo.com/svg/287632/agenda

## TODO
- Revisar la validación y el manejo de errores, cuales se lanzan como console.log, cuáles le llegan al usuario


- usar useRouter por ejemplo para redirigir tras el logout
- Revisar el rerenderizado al añadir algo al carrito
- Que al hacer login, se cargue el carrito desde la bbdd
- Hacer el navbar a trzos: uno SSR y otro CSR(el del carrito y posiblemente la busqueda)
- Meter un hook useMem que evite el renderizado de la tienda todo el rato? o un useref que dependa del setProductList.Asi solo se re-renderiza si cambia el stock, etc
- Redirigir a productos/inicio tras login
- Usar los Componentes iconos para los paneles de gestion
- Usar una foto de edna moda en los formularios dinámicos
- Revisar que el carro localstorage se actualiza bien al inicar sesión. Ahora si funciona, pero al recargar la pagina con la sesion abiertta sigue resumandolo al carro
- Los empleados pueden editar los productois pero no a los usuarios -> eso solo el admin
- Añadir el 404
- Revisar que alc errar la ventana y abrir con la cuenta abierta, también se suman sin limite la cesta
- ñadir mensajes de confirmación de edición y crecaión
- Añadir una imagen o icono segun rol en el formulario de usuarios
-Añadir botón de añadir usuario
- Incluir el precio total en el carrito
