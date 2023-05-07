import { Navbar } from "../components/navbar";
import Image from "next/image";
import boxeImage from "../public/images/90979051_original.webp";
import logo from "../public/images/HappyFit-logo.png";

const BoxingPage = () => {
  return (
    <Navbar>
      <div className="boxing-page-container">
        <div className="boxing-image-container">
          <Image src={boxeImage} alt="image-boxe" className="image-boxe" />
        </div>
        <div className="boxing-text-container">
          <h1>
            Dépassez vos limites avec un programmes de boxe
            <br /> sur-mesure qui vous ressemble.
          </h1>
          <div className="stay-in-touch-container"></div>
        </div>
      </div>
    </Navbar>
  );
};

export default BoxingPage;
