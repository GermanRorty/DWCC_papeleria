'use client';

import { getCategories } from "@/lib/services/categorias";
import { useEffect, useState } from "react";


const Filters = ({fullProductsList, setFilteredList, setFilterApplied}) => {
    const [categories, setCategories] = useState();

    useEffect(() =>{
        const fetchCategories = async() =>{
            const categoriesRetrieved = await getCategories();
            setCategories(categoriesRetrieved);
        };
        fetchCategories();
    },[])


    const establishFilter =(catId)=> {
        setFilteredList(()=>{return fullProductsList.filter((p)=> p.categoryId === catId)})
        setFilterApplied(true);
    }

    const clearFilter = () =>{
        setFilterApplied(false);
    }

    if (!categories) {
		return <div>Loading...</div>; //  O cualquier otro indicador de carga
	}

    return(
        <div className="w-1/4 ms-9 right-0">
            <div className="d-flex  justify-between">
                <h5>Filtros</h5>
                <button className="btn border -translate-y-2" onClick={clearFilter}>Limpiar</button>
            </div>
            <div className="d-flex flex-col justify-start align-items-start text-start">
                {categories.length>0 && categories.map((cat)=>{
                    return(
                        <button className="border-t-2 w-full text-left p-2" key={cat.id} onClick={()=>establishFilter(cat.id)}>{cat.nombre}</button>
                    );
                })}
                </div>
        </div>
    );
}

export default Filters;