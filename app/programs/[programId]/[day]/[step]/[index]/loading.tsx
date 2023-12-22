import { Title } from "@tremor/react";
import WarmUpLoader from "@/components/loaders/programs/WarmupLoader";

const Loading = () => {
  return (
    <main className="page">
      <Title className="text-white">Loading...</Title>
      <WarmUpLoader />
    </main>
  );
};

export default Loading;
