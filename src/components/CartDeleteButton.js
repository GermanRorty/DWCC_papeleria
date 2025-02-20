// app/components/CartButton.js

import { useCartContext } from "@/context/CartContext";

const CartDeleteButton = ({ productId }) => {
	const { setCart } = useCartContext();

	const removeFromCart = (id) => {
        // Para evitar problemas se recomienda usar una version con prevCart en lugar de
        // setCart(cart.filter((a) => (!a.id === article.id)));
		setCart((prevCart) => prevCart.filter((a) => a.id !== id));
	};

	return <button onClick={() => removeFromCart(productId)}>Eliminar</button>;
};

export default CartDeleteButton;