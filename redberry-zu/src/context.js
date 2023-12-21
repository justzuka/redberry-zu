import React, { createContext, useContext, useState, useEffect } from "react";
import { GetCategories } from "./FetchInformation";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await GetCategories();
        setCategories(categoriesData);
        console.log("HI");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ categories, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
