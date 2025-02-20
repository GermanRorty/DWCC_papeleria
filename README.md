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
- Crear hooks propios
- Revisar la validación y el manejo de errores, cuales se lanzan como console.log, cuáles le llegan al usuario
- Convertir el formulario en un componente dinámico que se genere en base a los campos que se le especifiquen y que guarde seguun la funcion que le se le pasa
- setValue en useForm para actulizar los valores del formulario a los de un elemento que ya esxiste y que se muestren en los inputs
- Llamar a la app Inkubook como incubo
- Ver si el formulario de edicion y nuevos usuarios es el mismo o no. Porque ahora mismo el de nuevos usuarios siempre asigna un carro vacio
- usar useRouter por ejemplo para redirigir tras el logout
- Revisar el rerenderizado al añadir algo al carrito
- Que al hacer login, se cargue el carrito desde la bbdd
- Hacer el navbar a trzos: uno SSR y otro CSR(el del carrito y posiblemente la busqueda)