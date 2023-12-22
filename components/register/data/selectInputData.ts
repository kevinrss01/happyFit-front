import { BiWorld } from "react-icons/bi";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { GiBrain, GiThreeFriends } from "react-icons/gi";
import { GrAppleAppStore, GrGooglePlay } from "react-icons/gr";
import { IoLogoTiktok } from "react-icons/io5";

export const numberSessionsAvailable = [
  {
    label: "1 session",
    value: "1",
  },
  {
    label: "2 sessions",
    value: "2",
  },
  {
    label: "3 session",
    value: "3",
  },
  {
    label: "4 sessions",
    value: "4",
  },
  {
    label: "5 session",
    value: "5",
  },
  {
    label: "6 sessions",
    value: "6",
  },
  {
    label: "7 sessions",
    value: "7",
  },
];

export const typeOfReferenceSource = [
  { text: "Linkedin", value: "linkedin", icon: AiFillLinkedin },
  { text: "Facebook", value: "facebook", icon: AiFillFacebook },
  { text: "Twitter", value: "twitter", icon: AiFillTwitterSquare },
  { text: "Instagram", value: "instagram", icon: AiOutlineInstagram },
  { text: "Youtube", value: "youtube", icon: AiFillYoutube },
  {
    text: "Ami/Famille/collègue",
    value: "family-friends-colleague",
    icon: GiThreeFriends,
  },
  {
    text: "Moteur de recherche",
    value: "search-engine",
    icon: AiFillGoogleCircle,
  },
  { text: "Discord", value: "discord", icon: GiBrain },
  { text: "App Store", value: "app-store", icon: GrAppleAppStore },
  { text: "Google Play", value: "google-play", icon: GrGooglePlay },
  { text: "TikTok", value: "tiktok", icon: IoLogoTiktok },
  { text: "Autres", value: "other", icon: BiWorld },
];
