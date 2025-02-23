// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";

const CartDeleteButton = ({ productId }) => {
	const { setCart } = useCartContext();

	const dropCart = (id) => {
        // Para evitar problemas se recomienda usar una version con prevCart en lugar de
        // setCart(cart.filter((a) => (!a.id === article.id)));
		setCart([]);
	};

	return <button onClick={() => dropCart(productId)}>Vaciar</button>;
};

export default CartDeleteButton;