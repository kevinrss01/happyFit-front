/* eslint-disable react/no-unescaped-entities */
"use client";
import { CustomTab } from "@/types/propsTypes";
import { MdEmojiPeople } from "react-icons/md";
import { Card, CardBody } from "@nextui-org/react";
import {
  GiBodyBalance,
  GiGymBag,
  GiMeditation,
  GiMuscleFat,
  GiTank,
  GiWeight,
} from "react-icons/gi";
import { BiRun, BiTimer } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { PiParkDuotone } from "react-icons/pi";
import React from "react";

export const tabs: CustomTab[] = [
  {
    key: "0",
    title: "Débutant",
    icon: <MdEmojiPeople />,
    isDisabled: false,
    body: (
      <Card isBlurred>
        <CardBody>
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Je suis débutant, je n'ai jamais pratiqué de sport/musculation
            auparavant ou très peu.
          </p>
        </CardBody>
      </Card>
    ),
  },
  {
    key: "1",
    title: "Intermédiaire",
    icon: <GiBodyBalance />,
    isDisabled: false,
    body: (
      <Card isBlurred>
        <CardBody>
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            J'ai au minimum <u>1 an d'expérience</u> en musculation et je
            connais les bases.
          </p>
        </CardBody>
      </Card>
    ),
  },
  {
    key: "2",
    title: "Avancé",
    icon: <GiMeditation />,
    isDisabled: false,
    body: (
      <Card isBlurred>
        <CardBody>
          <p>
            J'ai au minimum <u>2 ans d'expérience</u> en musculation et j'ai de
            très bonnes bases.
          </p>
        </CardBody>
      </Card>
    ),
  },
  {
    key: "3",
    title: "Expert",
    icon: <GiTank />,
    isDisabled: true,
  },
];
export const goalsTabs: CustomTab[] = [
  {
    key: "lose weight",
    title: "Perdre du poids",
    icon: <GiWeight />,
    isDisabled: false,
    body: (
      <Card isBlurred>
        <CardBody>
          <p>
            Votre objectif principal est de perdre du poids et de vous
            débarrasser de la mauvaise graisse. <br />
            <br />
            Si vous n'êtes pas à l'aise dans votre peau et que vous aspirez à
            vous affiner tout en perdant des kilos sur la balance, cet objectif
            est fait pour vous.
          </p>
        </CardBody>
      </Card>
    ),
  },
  {
    key: "gain muscle",
    title: "Prendre du muscle",
    icon: <GiMuscleFat />,
    isDisabled: false,
    body: (
      <Card isBlurred>
        <CardBody>
          <p>
            Votre objectif principal est de prendre de la masse. En d'autres
            termes, vous voulez développer vos muscles tout en minimisant la
            prise de gras. <br /> <br /> Le cardio est moins important pour vous
            ; ce qui compte vraiment, c'est de bien remplir votre t-shirt. Si
            vous vous trouvez trop maigre ou que vous rêvez d'avoir les biceps
            de Popeye, cet objectif vous conviendra parfaitement.
          </p>
        </CardBody>
      </Card>
    ),
  },
  {
    key: "fitness",
    title: "Remise en forme",
    icon: <BiRun />,
    isDisabled: false,
    body: (
      <Card isBlurred>
        <CardBody>
          <p>
            Optez pour cet objectif si vous cherchez à améliorer votre condition
            physique globale : vous affiner, perdre un peu de poids, gagner un
            peu de muscle et booster votre santé. <br /> <br />
            En ce moment, l'une de vos priorités est votre bien-être. <br />
            Vous en avez assez d'être essoufflé après seulement 20 marches
            d'escalier. Si votre idéal corporel se rapproche plus de Bruce Lee
            que d'Arnold Schwarzenegger, cet objectif est taillé sur mesure pour
            vous.
          </p>
        </CardBody>
      </Card>
    ),
  },
];
export const placeTabs: CustomTab[] = [
  {
    key: "home",
    title: "À la maison, sans matériel",
    icon: <IoHome />,
    isDisabled: false,
  },
  {
    key: "gym",
    title: "En salle de sport",
    icon: <GiGymBag />,
    isDisabled: false,
  },
  {
    key: "outdoor",
    title: "Street workout",
    icon: <PiParkDuotone />,
    isDisabled: true,
  },
];
export const timeAvailableTabs: CustomTab[] = [
  {
    key: "30",
    title: "30 minutes",
    icon: <BiTimer />,
    isDisabled: false,
  },
  {
    key: "45",
    title: "45 minutes",
    icon: <BiTimer />,
    isDisabled: false,
  },
  {
    key: "60",
    title: "60 minutes",
    icon: <BiTimer />,
    isDisabled: false,
  },
  {
    key: "75",
    title: "1 heure 15",
    icon: <BiTimer />,
    isDisabled: false,
  },
  {
    key: "90",
    title: "1 heure 30",
    icon: <BiTimer />,
    isDisabled: false,
  },
];
