"use client";

import Link from "next/link";
import { useCartContext } from "@/app/context/CartContext";
import { useSession } from "next-auth/react";
import AuthComponent from "@/app/auth/page";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GestionDropdown = ({ session, aria, onEntering, onLeaving }) => {
	useEffect(() => {}, [session]);
	const router = useRouter();

	const redirectToManagement = ()=>{
		router.push("/Gestion");
	}

	if (session?.user.rol != "admin") return null;
	return (
		<div onMouseEnter={onEntering} onMouseLeave={onLeaving}>
			<button
				className="btn dropdown-toggle d-flex align-items-center gap-1 py-1 ps-3"
				type="button"
				id="mngmntDropdownButton"
				data-bs-toggle="dropdown"
				aria-expanded={aria ? "true" : "false"}
				onClick={redirectToManagement}
			>
				<div className="titulo">Gestión</div>
				<Image alt="agenda logomark" src="/images/agendaicon.svg" width={500} height={500} className="w-14"></Image>
			</button>

			<ul className={`dropdown-menu ${aria ? "show" : ""}`} aria-labelledby="mngmntDropdownButton">
				<li>
					<Link className="dropdown-item" href="/Gestion/Usuarios">
						Usuarios
					</Link>
				</li>
				<li>
					<Link className="dropdown-item" href="/Gestion/Productos">
						Productos
					</Link>
				</li>
			</ul>
		</div>
	);
};

const NavBarCSR = () => {
	const { data: session, status } = useSession();
	const [isSignMenuDown, setIsSignMenuDown] = useState(false); // Estados para controlar la visibilidad del dropdown
	const [isMagmntMenuDown, setisMagmntMenuDown] = useState(false);

	const { cart } = useCartContext();
	const { displayCart, setDisplayCart } = useCartContext();
	const handleDisplayCart = () => {
		setDisplayCart((prevDisplayCart) => !prevDisplayCart);
	};

	const toggleDropdown = () => {
		setIsSignMenuDown(!isSignMenuDown);
	};

	return (
		<div className="flex flex-row gap-9">
			<ul className="d-flex flex-row justify-content-center align-items-center m-0 p-0 gap-5">
				<GestionDropdown
					session={session}
					aria={isMagmntMenuDown}
					onEntering={() => setisMagmntMenuDown(true)}
					onLeaving={() => setisMagmntMenuDown(false)}
				/>
				<li className="flex items-center">
					<Image alt="magnifying glass logomark" src="/images/magnifyinglass.svg" width={500} height={500} className="w-10"></Image>
 				</li>
				<li className="d-flex flex-col items-center">
					<div className="position-absolute -translate-y-4 text-xs py-0 my-0 h-0.5 titulo">{typeof cart[0]!="string" && cart.length?cart?.reduce((acc, item) => acc + item.quantity, 0):""}</div>
					<button onClick={handleDisplayCart}>
						<Image alt="old backpack logomark" src="/images/oldbackpackicon.svg" width={500} height={500} className="w-12"></Image>
					</button>
				</li>
			
			<div
				className="d-flex flex-col justify-content-center align-items-center m-0 p-0"
				onMouseLeave={() => setIsSignMenuDown(false)}
			>
				<div className="position-absolute text-xs -translate-y-9 titulo">{session?.user.name}</div>
				<div>
				<button
					className="btn dropdown-toggle p-1"
					type="button"
					id="dropdownMenuButton"
					data-bs-toggle="dropdown"
					aria-expanded={isSignMenuDown ? "true" : "false"}
					onClick={toggleDropdown}
				>
					<Image alt="Ink logomark" src="/images/oldstampicon.svg" width={500} height={500} className="w-14"></Image>
				</button>
				<ul className={`dropdown-menu ${isSignMenuDown ? "show" : ""}`} aria-labelledby="dropdownMenuButton">
					<div className={`${isSignMenuDown?"d-block":"d-none"}`}>
					<AuthComponent />
					</div>
				</ul>
				</div>
			</div>
			</ul>
		</div>
	);
};

export default NavBarCSR;
