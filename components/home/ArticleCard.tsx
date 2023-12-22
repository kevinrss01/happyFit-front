/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Bold, Card, Text, Title, Subtitle } from "@tremor/react";
import Image from "next/image";
import { ArticleCardProps } from "@/types/propsTypes";

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, subject, author, date, text, url } = article;

  return (
    <Card className="card">
      <Title className="title">{title}</Title>

      <Image src={url} width={600} height={400} alt="Picture of the article" />
      <div className="date-container">
        <Text className="mb-2">Ajouté le {date}</Text>
      </div>
      <div className="subject-container">
        <Bold className="mb-2 text-white">Sujet de l'article : {subject}</Bold>
      </div>
      <div
        className="body-card"
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
      <Subtitle className="mt-5 w-[100%]">Écrit par {author}</Subtitle>
    </Card>
  );
};

export default ArticleCard;
