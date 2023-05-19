import { CgMenuGridO } from "react-icons/cg";
import { MdAutoGraph, MdSportsMma } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter } from "next/router";
import logo from "../public/images/HappyFit-logo.png";
import Image from "next/image";
export const Navbar = ({ children }) => {
  const router = useRouter();
  const { asPath } = useRouter();

  const links = [
    {
      name: "Général",
      icon: <CgMenuGridO />,
      path: "/general",
    },
    {
      name: "Programmes",
      icon: <GiWeightLiftingUp />,
      path: "/programmes",
    },
    {
      name: "Bilan",
      icon: <MdAutoGraph />,
      path: "/bilan",
    },
    {
      name: "Boxe",
      icon: <MdSportsMma />,
      path: "/boxe",
      button: true,
    },
    {
      name: "Paramètres",
      icon: <AiOutlineSetting />,
      path: "/reglages",
    },
  ];

  return (
    <div className="navbar-parent">
      <div className="navbar-container">
        <div className="logo-container">
          <Image src={logo} height={80} width={80} alt="logo-happy-fit" />
        </div>
        <div className="link-container">
          {links.map((link, index) => {
            return (
              <div
                key={index}
                className={
                  asPath === link.path
                    ? "icon-container icon-container-selected"
                    : "icon-container"
                }
                onClick={() => {
                  router.push(link.path);
                }}
              >
                {link.icon}
                <span style={{ width: link.button ? "28%" : "70%" }}>
                  {link.name}
                </span>
                {link.button && (
                  <button className="custom-btn btn-3">Bientôt</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="children">{children}</div>
    </div>
  );
};
