import { DashboardTitle } from "@/lib/dashboard-titles";
import { createContext, ReactNode, useContext } from "react";

interface PageTitleContextType {
  pageTitle: DashboardTitle | null;
  setPageTitle: (title: DashboardTitle | null) => void;
}

const PageTitleContext = createContext<PageTitleContextType | null>(null);

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("PageTitle must be used within a TitleProvider");
  }
  return context;
};

interface PageTitleProviderProps {
  children: ReactNode;
  pageTitle: DashboardTitle | null;
  setPageTitle: (pageTitle: DashboardTitle | null) => void;
}

export const PageTitleProvider = ({
  children,
  pageTitle,
  setPageTitle,
}: PageTitleProviderProps) => {
  return (
    <PageTitleContext.Provider
      value={{ pageTitle: pageTitle, setPageTitle: setPageTitle }}
    >
      {children}
    </PageTitleContext.Provider>
  );
};
