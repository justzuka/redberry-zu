import React from "react";
import "./Blogs.css";
import BlogItem from "./BlogItem";

const Blogs = ({ blogs }) => {
  return (
    <div className="main-blogs-container">
      <div className="blogs-container">
        {blogs.map((blog, index) => (
          <BlogItem
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            publish_date={blog.publish_date}
            author={blog.author}
            categories={blog.categories}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
