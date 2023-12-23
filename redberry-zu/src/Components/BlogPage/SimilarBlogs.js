import React, { useEffect, useRef, useState } from "react";
import "./SimilarBlogs.css";
import { useAppContext } from "../../context";
import BlogItem from "../Blogs/BlogItem";

import { ReactComponent as SCROLL_ARROW } from "../../Image_SVG_Resources/ScrollArrow.svg";

export const SimilarBlogs = ({ main_blog }) => {
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const { getSimilarBlogs, blogs } = useAppContext();
  const sliderRef = useRef(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  useEffect(() => {
    scrollToLeft()
    setSimilarBlogs(getSimilarBlogs(main_blog));
  }, [main_blog, blogs]);

  const clamp = (value) => {
    return Math.min(1, Math.max(0, value));
  };

  const adjustSliderValue = (value, w) => {
    return (
      Math.round(
        (Math.round(clamp(value / w) * (similarBlogs.length - 3)) * w * 100) /
          (similarBlogs.length - 3)
      ) / 100
    );
  };

  const scrollToLeft = () => {
    const container = sliderRef.current;
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
    setIsLeftDisabled(true);
    setIsRightDisabled(false);
  };

  const moveSlider = (direction) => {
    const container = sliderRef.current;

    let to = 0;

    if (direction === "right") {
      to = adjustSliderValue(
        container.scrollLeft + container.scrollWidth / similarBlogs.length,
        container.scrollWidth - container.clientWidth
      );
      container.scrollTo({
        left: to,
        behavior: "smooth",
      });
    } else {
      to = adjustSliderValue(
        container.scrollLeft - container.scrollWidth / similarBlogs.length,
        container.scrollWidth - container.clientWidth
      );
      container.scrollTo({
        left: to,
        behavior: "smooth",
      });
    }

    let scrollPercentage = to / (container.scrollWidth - container.clientWidth);
    scrollPercentage = Math.round(scrollPercentage * 100) / 100;

    if (scrollPercentage === NaN) {
      return;
    }

    setIsLeftDisabled(scrollPercentage === 0);

    setIsRightDisabled(scrollPercentage === 1);
  };

  return (
    <div className="similar-blogs-container">
      <div className="text-arrows-container">
        <div className="similar-blogs-text">მსგავსი სტატიები</div>
        <div className="scroll-arrows">
          <Arrow
            isLeft={true}
            isDisabled={similarBlogs.length <= 3 ? true : isLeftDisabled}
            move={() => moveSlider("left")}
          />
          <Arrow
            isDisabled={similarBlogs.length <= 3 ? true : isRightDisabled}
            move={() => moveSlider("right")}
          />
        </div>
      </div>

      <div className="similar-blogs-scroll" ref={sliderRef}>
        {similarBlogs.map((blog, index) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

const Arrow = ({ isLeft, isDisabled, move }) => {
  return (
    <div
      onClick={move}
      className={`scroll-arrow-button ${
        isDisabled ? "scroll-arrow-button-disabled" : ""
      }`}
    >
      <SCROLL_ARROW className={`scroll-arrow ${isLeft ? "rotate180" : ""}`} />
    </div>
  );
};
