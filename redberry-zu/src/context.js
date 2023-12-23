import React, { createContext, useContext, useState, useEffect } from "react";
import { GetCategories, GetBlogs } from "./FetchInformation";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryIndexToId, setCategoryIndexToId] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const setCategorySelected = (index) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] = !newSelectedCategories[index];
    setSelectedCategories(newSelectedCategories);
  };

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const categoriesData = await GetCategories();
        setSelectedCategories(categoriesData.map(() => false));
        setCategoryIndexToId(categoriesData.map((category) => category.id));
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

  const isBlogInFilter = (blog) => {
    const categorySet = new Set(blog.categories.map((category) => category.id));
    let result = true;

    for (let i = 0; i < selectedCategories.length; i++) {
      if (selectedCategories[i] && !categorySet.has(categoryIndexToId[i])) {
        result = false;
        break;
      }
    }

    return result;
  };

  useEffect(() => {
    setFilteredBlogs([...blogs].filter((blog) => isBlogInFilter(blog)));
  }, [blogs, selectedCategories]);

  const getSimilarityCount = (main_blog, other_blog) => {
    const main_blog_category_ids_set = new Set(
      main_blog.categories.map((category) => category.id)
    );

    const other_blog_category_ids = other_blog.categories.map(
      (category) => category.id
    );
    let count = 0;
    for (let i = 0; i < selectedCategories.length; i++) {
      if (main_blog_category_ids_set.has(other_blog_category_ids[i])) {
        count += 1;
      }
    }

    return count;
  };

  const getSimilarBlogs = (main_blog) => {
    console.log("HERE")
    console.log(blogs)
    console.log(main_blog)
    return blogs
      .map((blog) => ({
        ...blog,
        similarity: getSimilarityCount(main_blog, blog),
      }))
      .filter((blog) => blog.similarity !== 0)
      .sort((a, b) => b.similarity - a.similarity);
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        filteredBlogs,
        selectedCategories,
        blogs,
        getSimilarBlogs,
        setCategorySelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
