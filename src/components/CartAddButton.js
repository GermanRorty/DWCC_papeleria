// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";

const CartAddButton = ({ product , quantity = 1}) => {
	const chosenArticle = product;
    console.log(product);
	const { cart, setCart } = useCartContext();

	const addToCart = (article, units) => {
		const foundArticle = cart.find((item) => item.id === article.id);
		if (foundArticle) {
			setCart((prevCart) => prevCart.map((a) => (a.id === article.id ? { ...a, quantity: a.quantity + units } : a)));
		} else {
			setCart((prevCart) => [...prevCart, { ...article, quantity: 1 }]);
		}
	};

	return <button onClick={() => addToCart(chosenArticle, quantity)}>Agregar</button>;
};

export default CartAddButton;
