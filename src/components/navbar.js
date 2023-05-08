import { CgMenuGridO } from "react-icons/cg";
import { MdAutoGraph, MdSportsMma } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter, usePathname } from "next/router";
export const Navbar = ({ children }) => {
  const router = useRouter();
  const { asPath, pathname } = useRouter();

  return (
    <div
      className="navbar-parent"
      style={{
        width: "100%",
        display: "flex",
        height: "100%",
      }}
    >
      <div className="navbar-container">
        <div className="link-container">
          <div
            className={
              asPath === "/general"
                ? "icon-container icon-container-selected"
                : "icon-container"
            }
            onClick={() => {
              router.push("/general");
            }}
          >
            <CgMenuGridO />
            <span>Général</span>
          </div>
          <div
            className={
              asPath === "/programmes"
                ? "icon-container icon-container-selected"
                : "icon-container"
            }
            onClick={() => {
              router.push("/programmes");
            }}
          >
            <GiWeightLiftingUp />
            <span>Programmes</span>
          </div>
          <div
            className={
              asPath === "/bilan"
                ? "icon-container icon-container-selected"
                : "icon-container"
            }
            onClick={() => {
              router.push("/bilan");
            }}
          >
            <MdAutoGraph />
            <span>Bilan</span>
          </div>
          <div
            className={
              asPath === "/boxe"
                ? "icon-container icon-container-selected"
                : "icon-container"
            }
            onClick={() => {
              router.push("/boxe");
            }}
            style={{ opacity: 1 }}
          >
            <MdSportsMma style={{ opacity: 0.6 }} />
            <span style={{ opacity: 0.6 }}>Boxe</span>
            <button className="custom-btn btn-3">Bientôt</button>
          </div>
          <div
            className={
              asPath === "/parametres"
                ? "icon-container icon-container-selected"
                : "icon-container"
            }
            onClick={() => {
              router.push("/parametres");
            }}
          >
            <AiOutlineSetting />
            <span>Paramètres</span>
          </div>
        </div>
      </div>
      <div className="children" style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
};
