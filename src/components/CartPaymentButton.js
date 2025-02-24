"use client";

import { useCartContext } from "@/app/context/CartContext";
import { editProductFromDatabase } from "@/lib/services/productos";

const CartPaymentButton = () => {
	const { cart, setCart, displayCart, setDisplayCart, compraHecha, setCompraHecha } = useCartContext();

    const total = cart.reduce((acc, {quantity, price})=>{
        let total = acc + (parseInt(quantity) * parseFloat(price));
        return (Math.round(total*100))/100
    },0);

	const completePayment = async () => {
		// Un foreach sobrecarga el servidor y algunas peticiones pueden ser rechazadas
		for (const { id, quantity, amount } of cart) {
			const newProductInfo = { id, amount: amount - quantity };
			await editProductFromDatabase(newProductInfo);
		}

		setCart(["Gracias por tu compra"]);

		setTimeout(() => {
			setCompraHecha(true);
			setCart([]);
			setDisplayCart(false);
		}, 1300);

		// TODO: añadir gif de carga para por ejemplo el proceso de compra del carrito
		// TODO : Tienen que acualizarse los productos de la galeria (el stock)
	};

	return (
		<div className="w-11/12 mx-2 border-t-2 d-flex justify-between">
            <div className="d-flex justify-center align-items-center">
                <h5 className="mx-2 translate-y-0.5">Total:</h5>
                <div>{total}€</div>
            </div>
            <button
			className={`btn m-3 ${cart.length === 0 || typeof cart[0] === "string" ? "btn-secondary" : "btn-warning"} `}
			disabled={cart.length === 0 || typeof cart[0] === "string"}
			onClick={completePayment}
		>
			Pagar
		</button>
        </div>
	);
};

export default CartPaymentButton;
