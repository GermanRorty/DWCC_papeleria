// Template de elementos comunes a todas las páginas (navba, header, footer, etc )

import "./globals.css";
import Link from "next/link";
import Lapiz from "@/components/iconos/Lapiz";

// TODO: Ideas para el icono de perfil: https://www.svgrepo.com/svg/109446/pencil-box https://www.svgrepo.com/svg/260522/pencil-case-school-material  https://www.svgrepo.com/svg/269236/pencil-case https://www.svgrepo.com/svg/455419/pencil-ruler https://www.svgrepo.com/svg/456626/pencil-paper https://www.svgrepo.com/svg/455416/pencil-case


const NavBar = () => {
	return (
		<nav className="flex flex-row gap-5 justify-between p-6 bg-black">
			<ul className="flex flex-row gap-5">
				<li>
					<Link href="/">LogoInicio</Link>
				</li>
				<li>
					<Link href="/">Productos</Link>
				</li>
				<li>
					<Link href="/">LogoInicio</Link>
				</li>
			</ul>
			<div className="flex flex-row gap-9">
				<ul className="flex flex-row gap-5">
					<li>
						<Link href="/">Búsqueda</Link>
					</li>
					<li>
						<Link href="/">Carrito</Link>
					</li>
				</ul>
				<div className="w-7 h-auto">
					<Link href="/">
						<Lapiz/>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export const metadata = {
	title: "Papeleria App",
	description: "Created by German Rodriguez marty",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
