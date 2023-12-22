"use client";

import React from "react";
import WarmUpList from "@/components/programs/warmUp/WarmUpList";
import ExerciseList from "@/components/programs/workout/ExercisesList";
import { useParams } from "next/navigation";

const stepPage: {
  [key: string]: React.ReactNode;
} = {
  warmup: <WarmUpList />,
  workout: <ExerciseList />,
};

const StepList = () => {
  const params = useParams();
  const { step } = params;

  return (
    <main className="page">
      {stepPage[step as string] || "404 - Vous n'êtes pas sur la bonne page"}
    </main>
  );
};

export default StepList;
