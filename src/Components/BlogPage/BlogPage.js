import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { useNavigate, useParams } from "react-router-dom";
import BlogItem from "../Blogs/BlogItem";
import { GetBlogById } from "../../FetchInformation";
import { SimilarBlogs } from "./SimilarBlogs";
import { ReactComponent as BACK_ARROW } from "../../Image_SVG_Resources/BackArrow.svg";
import "./SimilarBlogs.css";

const BlogPage = () => {
  const [blog, setBlog] = useState(undefined);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await GetBlogById(id);
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(`/`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="blog-page-container">
      <div className="back-home" onClick={handleNavigateToHome}>
        <BACK_ARROW className={`back-arrow`} />
      </div>
      {blog === undefined ? (
        "waiting"
      ) : (
        <BlogItem
          isBlogPage={true}
          key={blog.id}
          id={blog.id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          publish_date={blog.publish_date}
          author={blog.author}
          categories={blog.categories}
          email={blog.email}
        />
      )}
      {blog === undefined ? "hello" : <SimilarBlogs main_blog={blog} />}
    </div>
  );
};

export default BlogPage;
