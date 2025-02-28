import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap globalmente
import Breadcrumbs from "@/components/Breadcrumbs";
import AuthProvider from "@/components/AuthProvider";
import { CartContextProvider, useCartContext } from "./context/CartContext";
import Header from "@/components/header/Header";
import { ScrollYContextProvider, useScrollYContext } from "./context/ScrollYContext";
import ScrollerWrapper from "@/components/ScrollerWrapper";
import { ProductsListContextProvider } from "./context/ProductsContext";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

export const metadata = {
	title: "Inkubook: Papeleria App",
	description: "Created by German Rodriguez Marty",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en" className="h-100">
			<ScrollYContextProvider>
				<body className="d-flex flex-column min-vh-100">
					<AuthProvider>
						<CartContextProvider>
							<ProductsListContextProvider>
								<Header />
								<ScrollerWrapper>
									{/* Contenedor principal que crece dinámicamente sin empujar el footer */}
									<div className="d-flex flex-column flex-grow-1 p-4">
										<Breadcrumbs />
										{children}
									</div>
									<Footer />
								</ScrollerWrapper>
							</ProductsListContextProvider>
						</CartContextProvider>
					</AuthProvider>
					<ToastContainer />
				</body>
			</ScrollYContextProvider>
		</html>
	);
};

export default RootLayout;
