// app/components/CartButton.js

import { useCartContext } from "@/app/context/CartContext";

const CartRemoveButton = ({ productId }) => {
    const { setCart } = useCartContext();

    const removeFromCart = (productId) => {
        setCart((prevCart)=>{
            return prevCart.filter((a) => a.id != productId)
        });
    };

    return (
        <button className="btn border-1 border-black shadow-sm m-0 h-6 w-6  p-0 d-flex justify-center right-0 top-0" onClick={() => removeFromCart(productId)}>
          <i className="bi bi-x text-black"></i>
        </button>
      );};

export default CartRemoveButton;