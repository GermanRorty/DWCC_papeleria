'use client';

import { getCategories } from "@/lib/services/categorias";
import { useEffect, useState } from "react";

const Filters = ({ fullProductsList, setFilteredList, setFilterApplied }) => {
    const [categories, setCategories] = useState();
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesRetrieved = await getCategories();
            setCategories(categoriesRetrieved);
        };
        fetchCategories();
    }, []);

    const establishFilter = (catId) => {
        setFilteredList(() => fullProductsList.filter((p) => p.categoryId === catId));
        setFilterApplied(true);
        setActiveFilter(catId);
    };

    const clearFilter = () => {
        setFilteredList(fullProductsList);
        setFilterApplied(false);
        setActiveFilter(null);
    };

    if (!categories) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-1/4 ms-9 right-0">
            <div className="d-flex justify-between">
                <h5>Filtros</h5>
                <button className="btn-cleaning-button rounded py-1 px-2 border -translate-y-2" onClick={clearFilter}>
                    Limpiar
                </button>
            </div>
            <div className="d-flex flex-col justify-start align-items-start text-start">
                {categories.length > 0 &&
                    categories.map((cat) => (
                        <button                        
                            key={cat.id}
                            onClick={() => establishFilter(cat.id)}
                            className={`border-t-2 w-full text-left p-2 transition-all duration-300 ${
                                activeFilter === cat.id
                                    ? 'bg-gradient-to-r from-gray-300 to-gray-300 text-white'
                                    : 'bg-white text-black'
                            }`}
                        >
                            {cat.nombre}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default Filters;
