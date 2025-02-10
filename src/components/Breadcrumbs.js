'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
    const pathName = usePathname();
    const pathSegments = pathName.split("/").filter((segment)=>segment); // El filter((x) => x) garantiza que no habrá elementos vacíos en el array resultante
    return(
            <div>Inicio
                {pathSegments.map((segment, index)=>{
                    const progresivePath = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    if(index === pathSegments.length - 1 ){
                        return(
                            <span>{segment}</span> // El final de la ruta corresponde al nombre del artículo
                        );
                    }
                    return(
                        <div>
                            &gt; <Link href={progresivePath}>{segment}</Link>
                        </div>
                    ); 
                })}
            </div>
    );
}

export default Breadcrumbs;