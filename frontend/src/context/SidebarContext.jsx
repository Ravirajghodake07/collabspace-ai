import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [sidebarItems, setSidebarItems] = useState([]);

  return (
    <SidebarContext.Provider
      value={{
        sidebarItems,
        setSidebarItems,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}