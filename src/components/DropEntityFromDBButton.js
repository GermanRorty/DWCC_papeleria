
import { deleteProducto } from "@/lib/services/productos";
import { deleteUser } from "@/lib/services/users";
import { useRouter } from "next/navigation";

const DropEntityFromDBButton = ({entityId, entityClass}) => {
    const router = useRouter();
    const deleteFunction = () => {
        if(entityClass === "product") deleteProducto(entityId);
        if(entityClass === "user") deleteUser(entityId);
    }

    const redirectHome = () => {
        router.push("/Productos");
    }

    return(
        <button className="btn btn-danger" onClick={()=>{deleteFunction(); redirectHome();}}>Eliminar</button>
    );

}


export default DropEntityFromDBButton;