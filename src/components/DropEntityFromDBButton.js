import { useProductsListContext } from "@/app/context/ProductsContext";
import { deleteProducto } from "@/lib/services/productos";
import { deleteUser } from "@/lib/services/users";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";

const DropEntityFromDBButton = ({ entityId, entityClass }) => {
    const{setEdicionHecha} = useProductsListContext();
	const router = useRouter();
	const deleteFunction = async() => {
		try {
			if (entityClass === "product") {
				await deleteProducto(entityId);
				toast.success("Producto eliminado de la base de datos", {
					autoClose: 4000,
					hideProgressBar: true,
					position: "bottom-right",
					transition: Slide,
					icon: false,
				});
                setEdicionHecha(true);

				router.push("/Gestion/Productos");
			}
			if (entityClass === "user") {
				await deleteUser(entityId);
				toast.success("Usuario eliminado de la base de datos", {
					autoClose: 4000,
					hideProgressBar: true,
					position: "bottom-right",
					transition: Slide,
					icon: false,
				});
				router.push("/Gestion/Usuarios");
			}
		} catch (error) {
			console.error(error);
			toast.error(error, {
				autoClose: 4000,
				hideProgressBar: true,
				position: "bottom-right",
				transition: Slide,
				icon: false,
			});
		};
    };

		return (
			<button
				className="btn btn-danger"
				onClick={() => {
					deleteFunction();
				}}
			>
				Eliminar
			</button>
		);

};

export default DropEntityFromDBButton;
