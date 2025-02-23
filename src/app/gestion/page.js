import Link from "next/link";

const ManagementPanel = () => {
	return (
		<div className="d-flex flex-row w-full gap-5 h-5/6 justify-center">
			<Link href={"/gestion/usuarios"} className=" btn w-1/3 h-2/4 border rounded d-flex justify-center m-5">
				<div className="d-flex align-items-center"> <h3 >Usuarios</h3></div>
			</Link>
			<Link href={"/gestion/productos"} className="btn w-1/3 h-2/4 border rounded d-flex justify-center m-5">
				<div className="d-flex align-items-center"><h3>Productos</h3></div>
			</Link>
		</div>
	);
};

export default ManagementPanel;
