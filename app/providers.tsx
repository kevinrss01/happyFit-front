"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ReduxProvider from "@/redux/ReduxProvider";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";

const navbarForbiddenPaths = ["/login", "/register"];

function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <NextUIProvider>
      <ToastContainer />
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ReduxProvider>
          <AuthGuard>
            {!navbarForbiddenPaths.includes(pathname) ? (
              <Navbar>{children}</Navbar>
            ) : (
              <>{children}</>
            )}
          </AuthGuard>
        </ReduxProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default Providers;
