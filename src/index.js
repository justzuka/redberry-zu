import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";
import { AppProvider } from "./context";
import BlogPage from "./Components/BlogPage/BlogPage";
import AddBlogPage from "./Components/AddBlogPage/AddBlogPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/addBlog" element={<AddBlogPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);