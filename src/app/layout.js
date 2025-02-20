// Template de elementos comunes a todas las páginas (navba, header, footer, etc )

import "./globals.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthProvider from "@/components/AuthProvider";
import { CartContextProvider, useCartContext } from "./context/CartContext";
import NavBarAncestor from "@/components/navbar/NavBarAncestor";

// TODO: Ideas para el icono de perfil: https://www.svgrepo.com/svg/109446/pencil-box https://www.svgrepo.com/svg/260522/pencil-case-school-material  https://www.svgrepo.com/svg/269236/pencil-case https://www.svgrepo.com/svg/455419/pencil-ruler https://www.svgrepo.com/svg/456626/pencil-paper https://www.svgrepo.com/svg/455416/pencil-case



export const metadata = {
	title: "Papeleria App",
	description: "Created by German Rodriguez marty",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<CartContextProvider>
						<NavBarAncestor />
						<Breadcrumbs />
						{children}
					</CartContextProvider>
				</AuthProvider>
			</body>
		</html>
	);
};

export default RootLayout;
