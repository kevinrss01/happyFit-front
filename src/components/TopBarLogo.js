import Image from "next/image";
import logo from "../public/images/HappyFit-logo.svg";
import { useRouter } from "next/router";

function TopBarLogo() {
  const { asPath, pathname } = useRouter();
  return (
    <div className="topBarContainer">
      <Image src={logo} alt="logo" width={70} height={70} />
      <h2>Happy Fit</h2>
    </div>
  );
}

export default TopBarLogo;
