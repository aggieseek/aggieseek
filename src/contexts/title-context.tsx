import { DashboardTitle } from "@/lib/dashboard-titles";
import { createContext, ReactNode, useContext } from "react";

interface TitleContextType {
  title: DashboardTitle | null;
  setTitle: (title: DashboardTitle | null) => void;
}

const TitleContext = createContext<TitleContextType | null>(null);

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error("PageTitle must be used within a TitleProvider");
  }
  return context;
};

interface TitleProviderProps {
  children: ReactNode,
  title: DashboardTitle | null,
  setTitle: (title: DashboardTitle | null) => void;
}

export const TitleProvider = ({ children, title, setTitle }: TitleProviderProps) => {
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};