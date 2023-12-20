import "./App.css";
import { NavBar } from "./Components/NavBar/NavBar";
import REDBERRY_IMAGE_LOGO from "./Image_SVG_Resources/Blog-1024x355 1.png"

function App() {
  return (
    <div className="background">
      <NavBar></NavBar>
      <div className="blog-image-row">
        <div className="blog-text">ბლოგი</div>
        <div>
        <img src={REDBERRY_IMAGE_LOGO} alt="REDBERRY_IMAGE_LOGO" />
        </div>
      </div>
    </div>
  );
}

export default App;
