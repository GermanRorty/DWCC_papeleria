// Template de elementos comunes a todas las páginas (navba, header, footer, etc )

import "./globals.css";
import Link from "next/link";
import LapizIcon from "@/components/iconos/Lapiz";
import PencilCaseIcon from "@/components/iconos/PencilCase";
import AgendaIcon from "@/components/iconos/Agenda";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

// TODO: Ideas para el icono de perfil: https://www.svgrepo.com/svg/109446/pencil-box https://www.svgrepo.com/svg/260522/pencil-case-school-material  https://www.svgrepo.com/svg/269236/pencil-case https://www.svgrepo.com/svg/455419/pencil-ruler https://www.svgrepo.com/svg/456626/pencil-paper https://www.svgrepo.com/svg/455416/pencil-case

const NavBar = () => {
	return (
		<nav className="flex flex-row gap-5 justify-between p-6 bg-black">
			<ul className="flex flex-row gap-5">
				<li>
					<Link href="/">
						<Image alt="Ink logomark" src="images/InkBottle-logo.svg" width={500} height={500} className="w-14"></Image>
					</Link>
				</li>
				<li className="flex items-center">
					<Link href="/productos" className="flex gap-2 items-center">
						<div>Productos</div>
						<div className="w-9 h-auto">
							<PencilCaseIcon />
						</div>
					</Link>
				</li>
				<li className="flex items-center">
					<Link href="/">LogoInicio</Link>
				</li>
			</ul>
			<div className="flex flex-row gap-9">
				<ul className="flex flex-row gap-5">
					<li className="flex items-center">
						<Link href="/">Búsqueda</Link>
					</li>
					<li className="flex items-center">
						<Link href="/">Carrito</Link>
					</li>
				</ul>
				<div className="w-14 h-auto">
					<Link href="/">
						<AgendaIcon className="w-12 h-12 text-blue-500" />
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

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<NavBar />
				<Breadcrumbs />
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
