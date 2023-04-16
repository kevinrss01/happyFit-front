import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNutrition } from "../redux/actions/nutritionActions";
import styles from "../styles/Home.module.css";
import Axios from "../service/axios";
import ProgramAPI from "../service/ProgramAPI";
import { getProgram } from "../redux/actions/sportActions";

export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgram());
  }, [dispatch]);
  return <></>;
}
