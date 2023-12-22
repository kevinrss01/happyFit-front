"use client";

import LoginForm from "@/components/login/LoginForm";
import TopBarLogo from "@/components/TopBarLogo";
import { useEffect, useState } from "react";

function Login() {
  const [randomDivNumber, setRandomDivNumber] = useState<number>(
    () => Math.floor(Math.random() * 3) + 1,
  );
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Initial call
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="login-form-container font-rubik">
      <TopBarLogo />
      <div className="login-form-and-image-container">
        <LoginForm windowWith={windowWidth} />
        {windowWidth > 1400 && (
          <div
            className={`login-form-image-container-${randomDivNumber}`}
          ></div>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default Login;
