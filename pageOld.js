export const GenericContextProvider = ({ children }) => {
    const [state, setState] = useState(null); // Estado genérico

    return (
        <GenericContext.Provider value={{ state, setState }}>
            {children}
        </GenericContext.Provider>
    );
};


export const useGenericContext = () => useContext(GenericContext);


const App = () => {
    return (
        <GenericContextProvider> {/* Envuelves el componente con el contexto */}
            <ExampleComponent />
        </GenericContextProvider>
    );
};



const ExampleComponent = () => {
    const { state, setState } = useGenericContext();

    return (...);
}