import "./Home.css";
import REDBERRY_IMAGE_LOGO from "./Image_SVG_Resources/Blog-1024x355 1.png"

function Home() {
  return (
    <div className="background">
      <div className="blog-image-row">
        <div className="blog-text">ბლოგი</div>
        <div>
        <img className="blog-image" src={REDBERRY_IMAGE_LOGO} alt="REDBERRY_IMAGE_LOGO" />
        </div>
      </div>
    </div>
  );
}

export default Home;
