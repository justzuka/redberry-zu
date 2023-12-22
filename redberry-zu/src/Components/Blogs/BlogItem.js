import React from "react";
import "./BlogItem.css";
import { Filter } from "../Filter/Filter";
import { ReactComponent as ARROW } from "../../Image_SVG_Resources/Arrow.svg";

const BlogItem = ({
  id,
  title,
  description,
  image,
  publish_date,
  author,
  categories,
}) => {
  return (
    <div className="blog-item">
      <div className="image-container">
        <img src={image} className="blog-image" alt="blog" />
      </div>
      <div className="author-text">{author}</div>
      <div className="publish-date-text">{publish_date}</div>
      <div className="title-text">{title}</div>
      <Filter categories={categories} />
      <div className="blog-description-text">{description}</div>
      <div className="to-blog-button">
        <div className="to-blog-button-text">სრულად ნახვა</div>
        <ARROW className="arrow" />
      </div>
    </div>
  );
};

export default BlogItem;
