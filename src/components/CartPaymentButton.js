'use client';

import { useCartContext } from "@/app/context/CartContext";
import { editProductFromDatabase } from "@/lib/services/productos";


const CartPaymentButton = () =>{
    const {cart, setCart, displayCart, setDisplayCart, compraHecha, setCompraHecha} = useCartContext();

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
    }

    return(
        <button className={`btn  ${(cart.length===0||typeof cart[0]==="string")?"btn-secondary":"btn-warning"} `} disabled={(cart.length===0||typeof cart[0]==="string")}   onClick={completePayment}>Pagar</button>
    );
}

export default CartPaymentButton;