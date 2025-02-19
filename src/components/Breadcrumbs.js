"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
	const pathName = usePathname();
	const pathSegments = pathName.split("/").filter((segment) => segment); // El filter((x) => x) garantiza que no habrá elementos vacíos en el array resultante
	return (
		<div>
			<Link href={"/"}>Inicio</Link>
			{pathSegments.map((segment, index) => {
				const progresivePath = `/${pathSegments.slice(0, index + 1).join("/")}`;
                console.log(progresivePath);
				if (index === pathSegments.length - 1) {
					return (
						<span key={index}>&gt;{segment}</span> // El final de la ruta corresponde al nombre del artículo
					);
				}
				return (
					<Link key={index} href={progresivePath}>
						{segment}
					</Link>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
