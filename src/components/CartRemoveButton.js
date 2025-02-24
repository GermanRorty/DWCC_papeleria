// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";

const CartRemoveButton = ({ productId }) => {
    const { setCart } = useCartContext();

    const removeFromCart = (productId) => {
        setCart((prevCart)=>{
            return prevCart.filter((a) => a.id != productId)
        });
    };

    return <button className="btn btn-danger px-2 m-1" onClick={() => removeFromCart(productId)}>Eliminar</button>;
};

export default CartRemoveButton;