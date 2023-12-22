"use client";
// Look at the README.md file for more information

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthAPI from "@/services/API/authAPI";
import { Tokens, VerifyTokenResponse } from "@/types/authTypes";
import AxiosCallApi from "@/services/API/axios";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { initializeUserState, setAuth } from "@/redux/slices/userSlice";
import UserAPI from "@/services/API/userAPI";
import toastMessage from "@/utils/toastMessage";
import { initializeArticles } from "@/redux/slices/articlesSlice";
import { ReduxUserState, ServerResponseLogin } from "@/types/userDataTypes";
import { selectUser } from "@/redux/slices/userSlice";

const noneConnectedPage = ["/login", "/register"];

const fetchAllArticles = async () => {
  return UserAPI.getAllArticles()
    .then((articles) => {
      return articles;
    })
    .catch((err: string) => {
      console.error(err);
      toastMessage(
        "Une erreur est survenue, veuillez réessayer plus tard" + err,
        "error"
      );
    });
};

const AuthGuard: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isVerificationDone, setIsVerificationDone] = useState<boolean>(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const setApplicationData = async () => {
    const articles = await fetchAllArticles();
    dispatch(initializeArticles(articles));
  };

  const handleVerifyTokenResponse = async (
    serverResponse: VerifyTokenResponse,
    localTokens: Tokens
  ): Promise<false | ServerResponseLogin | ReduxUserState> => {
    if (
      !localTokens.userId ||
      !localTokens.accessToken ||
      !localTokens.refreshToken
    ) {
      return false;
    }

    const actionResponseType: {
      [key: string]: () =>
        | false
        | Promise<ServerResponseLogin | false | ReduxUserState>;
    } = {
      "Invalid Token": () => false,
      "Expired Token": async () => {
        try {
          const newTokens = await AuthAPI.refreshToken(
            localTokens.refreshToken
          );
          AxiosCallApi.saveTokenAxios(newTokens.accessToken);
          localStorage.setItem(
            "tokens",
            JSON.stringify({ userId: localTokens.userId, ...newTokens })
          );

          return userData?.firstName
            ? userData
            : await UserAPI.getUserInfo(localTokens.userId);
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      "Valid Token": async () => {
        AxiosCallApi.saveTokenAxios(localTokens.accessToken);
        return userData?.firstName
          ? userData
          : await UserAPI.getUserInfo(localTokens.userId);
      },
    };

    return actionResponseType[serverResponse?.message]();
  };

  const verifyUserActualPath = (isConnected: boolean) => {
    if (!isConnected) {
      localStorage.removeItem("tokens");
      if (!noneConnectedPage.includes(pathname)) {
        push("/login");
      }
    } else {
      dispatch(setAuth(true));
      if (noneConnectedPage.includes(pathname)) {
        push("/");
      }
    }
  };

  useEffect(() => {
    const userTokens = JSON.parse(localStorage.getItem("tokens"));

    let isUserConnected: boolean;
    const verifyIfUserIsLoggedIn = async () => {
      if (userTokens) {
        try {
          const serverResponse = await AuthAPI.verifyToken(
            userTokens.accessToken
          );

          await handleVerifyTokenResponse(serverResponse, userTokens)
            .then(async (res: false | ServerResponseLogin | ReduxUserState) => {
              if (res) {
                //I set auth/isUserAuthenticated to true to avoid call in call without good tokens.
                //For example, if the user don't have good tokens, and go to the home page, yes he will be redirect to login page,
                // but the "setIsVerificationDone" will be set to true before the push is finished, so the user will see the home page for a second and get some errors messages.
                dispatch(
                  initializeUserState({ isUserAuthenticated: true, ...res })
                );
              }

              isUserConnected = !!res;
              await setApplicationData();
            })
            .catch((err: string) => {
              console.error(err);
              isUserConnected = false;
            });
        } catch (error) {
          console.error(error);
          isUserConnected = false;
        }
      } else {
        isUserConnected = false;
      }

      dispatch(setAuth(true));
      verifyUserActualPath(isUserConnected);

      setIsVerificationDone(true);
    };

    verifyIfUserIsLoggedIn();
  }, [pathname]);

  return (
    <>
      {isVerificationDone ? (
        children
      ) : (
        <div className="h-[100vh] w-[100%] flex items-center justify-center">
          <RotatingLines strokeColor="#3e8bd0" width="25" />
        </div>
      )}
    </>
  );
};

export default AuthGuard;
