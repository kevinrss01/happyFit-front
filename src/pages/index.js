import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNutrition } from "../redux/actions/nutritionActions";
import styles from "../styles/Home.module.css";
import Axios from "../service/axios";

export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get("test");
    dispatch(
      getNutrition({
        programs: [{ weeklyProgramNumber: 1, nutritionPrograms: ["test"] }],
      })
    );
  }, [dispatch]);
  return <></>;
}
