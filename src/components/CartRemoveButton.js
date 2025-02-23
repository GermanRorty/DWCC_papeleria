// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";

const CartRemoveButton = ({ productId }) => {
    const { setCart } = useCartContext();

    const removeFromCart = (productId) => {
        setCart((prevCart)=>{
            return prevCart.filter((a) => a.id != productId)
        });
    };

    return <button onClick={() => removeFromCart(productId)}>Eliminar</button>;
};

export default CartRemoveButton;