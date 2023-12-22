import React, { createContext, useContext, useState, useEffect } from "react";
import { GetCategories, GetBlogs } from "./FetchInformation";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await GetCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchBlogs = async () => {
      try {
        const blogsData = await GetBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    

    fetchCategories();
    fetchBlogs();
  }, []);

  return (
    <AppContext.Provider value={{ categories, blogs, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
