"use client";

import { CgMenuGridO } from "react-icons/cg";
import { MdAutoGraph, MdSportsMma } from "react-icons/md";
import { GiStrongMan } from "react-icons/gi";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";
import logo from "../public/images/HappyFit-logo.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { Icon, Bold } from "@tremor/react";
import { BiLogOutCircle } from "react-icons/bi";
import { MdGeneratingTokens } from "react-icons/md";
import { selectUser } from "@/redux/slices/userSlice";

const links = [
  {
    name: "Général",
    icon: <CgMenuGridO />,
    path: "/",
  },
  {
    name: "Programmes",
    icon: <GiStrongMan />,
    path: "/programs",
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
    path: "/settings",
  },
];

const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { push } = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [numberOfTokens, setNumberOfTokens] = useState<number>(9999);

  const pathname = usePathname();
  const userData = useSelector(selectUser);

  const closeModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handlePushPath = (path: string) => {
    if (path === "/programs") {
      const { programs } = userData;
      return push(`/programs/${programs[programs.length - 1].id}`);
    }

    push(path);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("tokens");
    push("/login");
  }, []);

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
                key={`link n°${index}: ${link.name}`}
                className={
                  pathname === link.path || pathname.includes(link.path + "/")
                    ? "icon-container icon-container-selected"
                    : "icon-container"
                }
                onClick={() => {
                  handlePushPath(link.path);
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
          {/*{userData.role && (*/}
          {/*  <ArticlesDataModal {...{ visible, showModal, closeModal }} />*/}
          {/*)}*/}
        </div>
      </div>
      <div className="children">{userData.isUserAuthenticated && children}</div>
      <div className="icons-container">
        <div className="token-container">
          <Icon
            size="lg"
            className="token"
            tooltip={`Nombre de jeton disponible : ${
              numberOfTokens === 9999 ? "Illimité" : `${numberOfTokens} jetons`
            }`}
            icon={MdGeneratingTokens}
            onClick={() => handleLogout()}
          />
          <Bold className="flex items-center justify-center text-white">
            Illimité
          </Bold>
        </div>

        <Icon
          size="lg"
          className="logout"
          tooltip="Se deconnecter"
          icon={BiLogOutCircle}
          onClick={() => handleLogout()}
        />
      </div>
    </div>
  );
};

export default Navbar;
