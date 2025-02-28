import Link from "next/link";

const ManagementPanel = () => {
	return (
		<div
			className="d-flex flex-row w-full gap-5 h-5/6 justify-center self-center align-items-center translate-y-4"
			style={{
				backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.35)), url('/images/root-background.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed", // Para mantener el fondo estático al hacer scroll
				width: "120%", // Hace que el div crezca más allá del viewport
				left: "-10%", // Lo centra si se amplía el ancho
			}}
		>
			<Link
				href={"/Gestion/Usuarios"}
				className="position-relative btn w-1/4 h-2/4 border rounded d-flex justify-center m-5 p-0 transform transition-transform duration-300 ease-out hover:scale-105"
			>
				<div
					className="container-fluid rounded-lg"
					style={{
						backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/images/users-bg.jpg)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<h3 className="position-absolute top-50 start-50 translate-middle text-indigo-100">Usuarios</h3>
				</div>
			</Link>
			<Link
				href={"/Gestion/Productos"}
				className="position-relative btn w-1/4 h-2/4 border rounded d-flex justify-center m-5 p-0 transform transition-transform duration-300 ease-out hover:scale-105"
			>
				<div
					className="container-fluid rounded-lg"
					style={{
						backgroundImage: "url(/images/productos-bg.jpg)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<h3 className="position-absolute top-50 start-50 translate-middle text-white">Productos</h3>
				</div>
			</Link>
		</div>
	);
};

export default ManagementPanel;
