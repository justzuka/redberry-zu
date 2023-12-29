import React from "react";
import "./BlogItem.css";
import { Filter } from "../Filter/Filter";
import { ReactComponent as ARROW } from "../../Image_SVG_Resources/Arrow.svg";
import { useNavigate } from "react-router-dom";

const BlogItem = ({
  id,
  title,
  description,
  image,
  publish_date,
  author,
  categories,
  isBlogPage,
  email,
}) => {
  const navigate = useNavigate();

  const handleNavigateToBlog = () => {
    navigate(`/blog/${id}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

  };
  return (
    <div className={`blog-item ${isBlogPage ? 'blog-item-page' : ''}`}>
      <div className="image-container">
        <img src={image} className={`${!isBlogPage ? 'blog-image-full' : 'blog-image'}`} alt="blog" />
      </div>
      <div className={`author-text ${isBlogPage ? 'author-text-page' : ''} `}>{author}</div>
      <div className="publish-date-text">{isBlogPage ? email ? `${publish_date} • ${email}` : publish_date  : publish_date}</div>
      <div className={`title-text ${isBlogPage ? 'title-text-page' : ''}`}>{title}</div>
      <Filter categories={categories} />
      <div className={`blog-description-text ${isBlogPage ? 'blog-description-text-page' : ''}`}>{description}</div>
      {isBlogPage ? '' : <div className="to-blog-button" onClick={handleNavigateToBlog}>
        <div className="to-blog-button-text">სრულად ნახვა</div>
        <ARROW className="arrow" />
      </div>}
    </div>
  );
};

BlogItem.defaultProps = {
  isBlogPage: false,
};

export default BlogItem;
