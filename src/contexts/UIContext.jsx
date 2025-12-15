import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isWipOpen, setIsWipOpen] = useState(false);

    const openWip = (e) => {
        if (e) e.preventDefault();
        setIsWipOpen(true);
    };

    const closeWip = () => setIsWipOpen(false);

    return (
        <UIContext.Provider value={{ isWipOpen, openWip, closeWip }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => useContext(UIContext);
