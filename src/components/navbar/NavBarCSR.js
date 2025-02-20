"use client";

import Link from "next/link";
import AgendaIcon from "@/components/iconos/Agenda";
import { useCartContext } from "@/app/context/CartContext";
import { useSession } from "next-auth/react";
import AuthComponent from "@/app/auth/page";
import { useState } from "react";

const GestionDropdown = ({ session, aria, onEntering, onLeaving }) => {
	if (session?.user.rol != "admin") return null;
	return (
		<div onMouseEnter={onEntering} onMouseLeave={onLeaving}>
		
		<button className="btn btn-primary dropdown-toggle"
		type="button"
		id="mngmntDropdownButton"
		aria-expanded={aria ? "true" : "false"} 
		>
		Gestión
		</button>

		<ul className={`dropdown-menu ${aria ? "show" : ""}`} aria-labelledby="mngmntDropdownButton">

		<li className="flex items-center">
			<Link className="dropdown-item" href="/productos/gestion" >
				Usuarios
			</Link>
		</li>
		<li>
			<Link className="dropdown-item" href="/productos/gestion" >
				Productos
			</Link>
		</li>
		</ul>
		</div >
	);
};

const NavBarCSR = () => {
	const { data: session, status } = useSession();
	const [isSignMenuDown, setIsSignMenuDown] = useState(false); // Estados para controlar la visibilidad del dropdown
	const [isMagmntMenuDown, setisMagmntMenuDown] = useState(false);

	const { displayCart, setDisplayCart } = useCartContext();
	const handleDisplayCart = () => {
		setDisplayCart((prevDisplayCart) => !prevDisplayCart);
	};

	const toggleDropdown = () => {
		setIsSignMenuDown(!isSignMenuDown);
	};

	return (
		<div className="flex flex-row gap-9">
			<ul className="flex flex-row gap-5">
				<GestionDropdown
					session={session}
					aria={isMagmntMenuDown}
					onEntering={()=>setisMagmntMenuDown(true)}
					onLeaving={()=>setisMagmntMenuDown(false)}
				/>
				<li className="flex items-center">
					<Link href="/">Búsqueda</Link>
				</li>
				<li className="flex items-center">
					<button onClick={handleDisplayCart}>Carrito</button>
				</li>
			</ul>
			<div className="dropdown" onMouseLeave={()=>setIsSignMenuDown(false)}>
				<button
					className="btn btn-primary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-bs-toggle="dropdown"
					aria-expanded={isSignMenuDown ? "true" : "false"}
					onClick={toggleDropdown}
				>
					Menú Desplegable
				</button>
				<ul className={`dropdown-menu ${isSignMenuDown ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
					{isSignMenuDown && <AuthComponent />}
				</ul>
			</div>
			<div>
				<Link href="/auth" className="dropdown">
					<div className="w-9">
						<div>{session?.user.name}</div>
						<AgendaIcon className="w-12 h-12 text-blue-500" />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default NavBarCSR;
