"use client";

import { useCartContext } from "@/app/context/CartContext";
import { useRef } from "react";

const OnClickPressButton = ({ sign, id, text }) => {
	const { cart, setCart } = useCartContext();
	const intervalRef = useRef(null);

	const oneUnitFunction = (sign, id) => {
		setCart((prevCart) => {
			return prevCart.map((a) => {
				if (a.id != id) return a;

				let newQuantity = a.quantity ?? 0;
				if (sign < 0 && newQuantity > 0) newQuantity--;
				if (sign > 0 && newQuantity < a.amount) newQuantity++;

				return { ...a, quantity: newQuantity };
			});
		});
	};

	const holdPressing = ( sign, id ) => {
		intervalRef.current = setInterval(() => {
			oneUnitFunction(sign, id);
		}, 130);
	};

	const releasePressing = () => {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	};

	return (
		<button
			className="btn btn-primary"
			onClick={() => oneUnitFunction(sign, id)}
			onMouseDown={() => holdPressing(sign, id)}
			onMouseUp={() => releasePressing()}
		>
			{text}
		</button>
	);
};

export default OnClickPressButton;
