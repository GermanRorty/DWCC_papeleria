// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";
import Image from "next/image";

const CartAddButton = ({ product, quantity = 1 }) => {
	const chosenArticle = product;
	// // DEBUG:
	// console.log(product);
	const { cart, setCart } = useCartContext();

	// Un boton que nos permite tanto sumar de uno en uno desde el catalogo, como incrementar/disminuir muchas unidades de golpe
	const addToCart = (article, units) => {
		// TODO: hacer que el stock no se guarde en el carrito, sino que se checkee vs la bbdd
		const foundArticle = cart.find((item) => item.id === article.id);
		if (foundArticle) {
			setCart((prevCart) => prevCart.map((a) => (a.id === article.id ? { ...a, quantity: a.quantity + units } : a)));
		} else {
			setCart((prevCart) => [...prevCart, { ...article, quantity: 1 }]);
		}
	};

	return (
		<button className={`btn shadow ${product.amount === 0?"btn-secondary border-0":""}`} style={{ backgroundColor: "rgba(229, 216, 165, 1)" }} onClick={() => addToCart(chosenArticle, quantity)} disabled={product.amount === 0}>
			{" "}
			<Image alt="add to cart-backpack icon" src="/images/addtobackpack.svg" width={500} height={500} className="w-5 h-6"></Image>
		</button>
	);
};

export default CartAddButton;
