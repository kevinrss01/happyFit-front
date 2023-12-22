"use client";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { Title } from "@tremor/react";

const WarmUpLoader = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWidth = (percentage: number) => {
    return (windowWidth * percentage) / 100;
  };

  return (
    <>
      <Title>Loading...</Title>
      {/*<Skeleton height={40} width={getWidth(50)} count={1} className=" mb-5" />*/}
      {/*<Skeleton*/}
      {/*  height={35}*/}
      {/*  width={getWidth(25)}*/}
      {/*  count={1}*/}
      {/*  className="mt-5 mb-5"*/}
      {/*/>*/}
      {/*<Skeleton count={1} height={50} width={getWidth(47)} />*/}
      {/*<Skeleton count={1} height={150} width={getWidth(47)} />*/}
      {/*<Skeleton count={1} height={50} width={getWidth(47)} />*/}

      {/*<div className="flex items-center justify-between">*/}
      {/*  <div className="m-5 flex flex-col items-center justify-center">*/}
      {/*    <Skeleton height={25} width={getWidth(15)} className="mt-5 mb-5" />*/}
      {/*    <Skeleton height={250} width={getWidth(20)} />*/}
      {/*  </div>*/}
      {/*  <div className="m-5 flex flex-col items-center">*/}
      {/*    <Skeleton height={25} width={getWidth(15)} className="mt-5 mb-5" />*/}
      {/*    <Skeleton height={250} width={getWidth(20)} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default WarmUpLoader;
