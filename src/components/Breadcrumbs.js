"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
	const pathName = usePathname();
	const pathSegments = pathName.split("/").filter((segment) => segment); // El filter((x) => x) garantiza que no habrá elementos vacíos en el array resultante
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link href={"/"}>Inicio</Link>
				</li>
				{pathSegments.map((segment, index) => {
					const progresivePath = `/${pathSegments.slice(0, index + 1).join("/")}`;
					// // DEBUG:
					// console.log(progresivePath);
					if (index === pathSegments.length - 1) {
						return (
							<li className="breadcrumb-item" key={index}>
								<span>{segment}</span> {/* // El final de la ruta corresponde al nombre del artículo */}
							</li>
						);
					}
					return (
						<li className="breadcrumb-item" key={index}>
							<Link href={progresivePath}>{segment}</Link>
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
