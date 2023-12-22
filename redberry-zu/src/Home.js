import "./Home.css";
import REDBERRY_IMAGE_LOGO from "./Image_SVG_Resources/Blog-1024x355 1.png";
import { Filter } from "./Components/Filter/Filter";
import { useAppContext } from "./context";
import Blogs from "./Components/Blogs/Blogs";
function Home() {
  const { categories, blogs } = useAppContext();
  return (
    <div className="background">
      <div className="page-container">
        <div className="blog-image-row">
          <div className="main-blog-text">ბლოგი</div>

          <img
            className="main-blog-image"
            src={REDBERRY_IMAGE_LOGO}
            alt="REDBERRY_IMAGE_LOGO"
          />
        </div>
        <Filter categories={categories}/>
        <Blogs blogs={blogs}/>
      </div>
    </div>
  );
}

export default Home;
