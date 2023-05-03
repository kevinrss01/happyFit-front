import LoginForm from "../components/LoginForm";
import TopBarLogo from "../components/TopBarLogo";
import { useState, useEffect } from "react";

export default function Connexion() {
  const [randomDivNumber, setRandomDivNumber] = useState(null);

  useEffect(() => {
    setRandomDivNumber(Math.floor(Math.random() * 3) + 1);
  }, []);

  return (
    <div className="login-form-container">
      <TopBarLogo />
      <div className="login-form-and-image-container">
        <LoginForm />
        {randomDivNumber === 1 && (
          <div className="login-form-image-container-1"></div>
        )}
        {randomDivNumber === 2 && (
          <div className="login-form-image-container-2"></div>
        )}
        {randomDivNumber === 3 && (
          <div className="login-form-image-container-3"></div>
        )}
      </div>
      <div></div>
    </div>
  );
}
