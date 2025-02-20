"use client";

import Link from "next/link";
import AgendaIcon from "@/components/iconos/Agenda";
import { useCartContext } from "@/app/context/CartContext";

const NavBarCSR = () => {
    const {displayCart, setDisplayCart} = useCartContext();
    const handleDisplayCart = ()=>{
        setDisplayCart((prevDisplayCart)=>!prevDisplayCart);
    }
	return (
			<div className="flex flex-row gap-9">
				<ul className="flex flex-row gap-5">
					<li className="flex items-center">
						<Link href="/">Búsqueda</Link>
					</li>
					<li className="flex items-center">
						<button onClick={handleDisplayCart}>Carrito</button>
					</li>
				</ul>
				<div className="w-14 h-auto">
					<Link href="/auth">
						<AgendaIcon className="w-12 h-12 text-blue-500" />
					</Link>
				</div>
			</div>

	);
};

export default NavBarCSR;