/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import WarmUp from "@/components/programs/warmUp/WarmUp";
import { useParams } from "next/navigation";
import Exercise from "@/components/programs/workout/Exercise";

const uniqueStep: {
  [key: string]: React.ReactNode;
} = {
  warmup: <WarmUp />,
  exercise: <Exercise />,
};

// eslint-disable-next-line react-hooks/rules-of-hooks

const UniqueStep = () => {
  const { step } = useParams();
  return (
    <main className="page">
      {uniqueStep[step as string] || "404 - Vous n'êtes pas sur la bonne page"}
    </main>
  );
};

export default UniqueStep;
