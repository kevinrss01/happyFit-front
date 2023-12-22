"use client";

import { Title } from "@tremor/react";
import ArticleCard from "@/components/home/ArticleCard";
import GeneralLoader from "@/components/loaders/Home/GeneralLoader";
import { Tabs, Tab } from "@nextui-org/react";
import { ImStatsDots } from "react-icons/im";
import { GrArticle } from "react-icons/gr";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { selectArticles } from "@/redux/slices/articlesSlice";

const Home = () => {
  const userData = useSelector(selectUser);
  const articlesData = useSelector(selectArticles);

  return (
    <main className="general-main-container page">
      <Title className="main-title">Bienvenue {userData?.firstName}</Title>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        className="tabs"
      >
        <Tab
          key="stats"
          title={
            <div className="flex items-center space-x-2">
              <ImStatsDots />
              <span>Mes statistiques</span>
            </div>
          }
        ></Tab>
        <Tab
          key="article"
          title={
            <div className="flex items-center space-x-2">
              <GrArticle />
              <span>Articles et conseils</span>
            </div>
          }
        >
          {articlesData.length > 0 ? (
            <div className="article-tab-container">
              {articlesData.map((article, index) => {
                return <ArticleCard key={index} article={article} />;
              })}
            </div>
          ) : (
            <>
              <GeneralLoader />
              <GeneralLoader />
            </>
          )}
        </Tab>
      </Tabs>
    </main>
  );
};

export default Home;
