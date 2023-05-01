import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProgram } from "../redux/actions/sportActions";

export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgram());
  }, [dispatch]);
  return <></>;
}
