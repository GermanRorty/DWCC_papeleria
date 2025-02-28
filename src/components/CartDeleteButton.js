// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";
import Image from "next/image";

const CartDeleteButton = ({ productId }) => {
	const { setCart } = useCartContext();

	const dropCart = (id) => {
		// Para evitar problemas se recomienda usar una version con prevCart en lugar de
		// setCart(cart.filter((a) => (!a.id === article.id)));
		setCart([]);
	};

	return (
		<div className="w-full d-flex justify-between position-sticky top-0 right-0 shadow bg-gray-200 z-50">
			<h4 className="self-start p-3 translate-y-1 d-flex gap-3">
				 <Image src={`/images/addbackpackicon.svg`} width={100} height={100} alt={"backpack cart icon"} className="w-7"/>
				 <div>Carrito</div>
			</h4>
			<button className="btn btn-secondary w-1/6 m-3 " onClick={() => dropCart(productId)}>
				<i className="bi bi-trash"></i>
			</button>
		</div>
	);
};

export default CartDeleteButton;
