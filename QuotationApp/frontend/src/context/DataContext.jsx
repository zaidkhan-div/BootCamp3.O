import { createContext, useContext, useState, useEffect } from "react";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [pending,setPending] = useState(false);
  const [error,setError] = useState(false);

  
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within an AuthProvider");
  }
  return context;
};
