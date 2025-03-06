import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { PageConfig } from '../Builder/builder.type';


interface BuilderContextProps {
    leftSideBarSelectedTab: number;
    setLeftSideBarSelectedTab: React.Dispatch<React.SetStateAction<number>>;
    builderType: number;
    setBuilderType: React.Dispatch<React.SetStateAction<number>>;
    styleEditSidebar: boolean;
    setStyleEditSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    toggleLayoutSidebar: boolean;
    setToggleLayoutSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    getMainWidth: () => string;
    builderJSON: PageConfig[];
}

interface SidebarProviderProps {
    children: ReactNode;
}

const BuilderContext = createContext<BuilderContextProps | undefined>(undefined);

export const BuilderProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [leftSideBarSelectedTab, setLeftSideBarSelectedTab] = useState<number>(0);
    const [builderType, setBuilderType] = useState<number>(0);
    const [styleEditSidebar, setStyleEditSidebar] = useState<boolean>(false);
    const [toggleLayoutSidebar, setToggleLayoutSidebar] = useState<boolean>(false);
    useEffect(() => {
        if (styleEditSidebar) {
            setToggleLayoutSidebar(false);
        }
    }, [styleEditSidebar]);
    useEffect(() => {
        if (toggleLayoutSidebar) {
            setStyleEditSidebar(false);
        }
    }, [toggleLayoutSidebar]);

    const getMainWidth = () => {
        if (toggleLayoutSidebar || styleEditSidebar) {
            return "w-[calc(100%-350px)]";
        } else {
            return "w-full";
        }
    };



    return (
        <BuilderContext.Provider value={{
            leftSideBarSelectedTab,
            setLeftSideBarSelectedTab: (value) => setLeftSideBarSelectedTab(value),
            builderType,
            setBuilderType,
            styleEditSidebar,
            setStyleEditSidebar,
            toggleLayoutSidebar,
            setToggleLayoutSidebar: () => setToggleLayoutSidebar(!toggleLayoutSidebar),
            getMainWidth,
            builderJSON: [],
        }}>
            {children}
        </BuilderContext.Provider>
    );
}

export const useBuilder = () => {
    const context = React.useContext(BuilderContext);
    if (context === undefined) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
}
