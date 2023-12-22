"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import React from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
