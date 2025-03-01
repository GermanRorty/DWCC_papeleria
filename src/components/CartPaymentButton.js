"use client";

import { useCartContext } from "@/app/context/CartContext";
import { editProductFromDatabase } from "@/lib/services/productos";

const CartPaymentButton = () => {
	const { cart, setCart, displayCart, setDisplayCart, compraHecha, setCompraHecha } = useCartContext();

    const total = cart.reduce((acc, {quantity, price})=>{
        let total = acc + (parseInt(quantity) * parseFloat(price).toFixed(2));
        return ((Math.round(total*100))/100)
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

	};

	return (
		<div className=" ms-2 border-t-2 d-flex justify-between w-auto">
            <div className="d-flex justify-center align-items-center">
                <h5 className="mx-2 translate-y-0.5">Total:</h5>
                {(!isNaN((total).toFixed(2)))&&<div>{parseFloat(total).toFixed(2)}€</div>}
                {(isNaN((total).toFixed(2)))&&<div>{0.00}€</div>}
            </div>
            <button
			className={`btn m-3 ${cart.length === 0 || typeof cart[0] === "string" ? "btn-secondary" : "btn-warning"} `}
			disabled={cart.length === 0 || typeof cart[0] === "string"}
			onClick={completePayment}
		>
			<div>Pagar</div>
		</button>
        </div>
	);
};

export default CartPaymentButton;
