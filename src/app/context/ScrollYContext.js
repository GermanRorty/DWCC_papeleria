'use client';

const { createContext, useContext, useState, useEffect } = require("react");

const ScrollYContext = createContext();

export const ScrollYContextProvider = ({children}) => {
        const [scrollingY, setScrollingY] = useState(false);
    
        useEffect(() => {
                const handleScroll = () => {
                    setScrollingY(window.scrollY > 20);
                };
        
                window.addEventListener("scroll", handleScroll);
        
                // Limpiar el evento cuando el componente se desmonte
                return () => window.removeEventListener("scroll", handleScroll);
            }, []);

        return (
            <ScrollYContext.Provider value={{scrollingY, setScrollingY}}>
                {children}
            </ScrollYContext.Provider>
        );
};

export const useScrollYContext = () => useContext(ScrollYContext);