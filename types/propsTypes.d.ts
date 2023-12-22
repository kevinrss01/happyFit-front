import React from "react";
import { Article } from "@/types/types";
import { Series } from "@/types/programTypes";
import { ReduxUserState } from "@/types/userDataTypes";
import WorkoutParamsContainer from "@/components/settings/personalInfo/WorkoutParamsContainer";
import HeightWeightContainer from "@/components/settings/personalInfo/HeightWeightContainer";
import GoalContainer from "@/components/settings/personalInfo/GoalContainer";
import { PersonalInfoSettings } from "@/types/userDataTypes";

export interface ModalTremorProps {
  children: React.ReactNode;
  isOpenModalState: boolean;
  closeModal: () => void;
  isLoadingButtonState: boolean;
}

export interface LoginModalContentProps {
  errorMessage: string;
  setEmail: (email: string) => void;
  email: string;
  isLoading: boolean;
  onSubmit: () => void;
  emailSent: boolean;
}

export interface LoginModalProps {
  isOpenModal: boolean;
  closeModal: () => void;
}

export interface LoginFormProps {
  windowWith: number;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ErrorCalloutProps {
  title: string;
  errorMessage: string;
}

export interface RegisterFormProps {
  handleNextForm: () => void;
}

export interface CustomTabsProps {
  label: string;
  ariaLabel: string;
  color: "primary" | "default" | "secondary" | "success" | "warning" | "danger";
  variant: "bordered" | "solid" | "light" | "underlined";
  selectedKey: any;
  onKeyChange: (value: string | React.Key, type: string) => void;
  typeKey: string;
  className: string;
  tabs: CustomTab[];
}

export interface CustomTab {
  key: string | number | React.Key;
  title: string;
  icon: React.ReactNode;
  isDisabled: boolean;
  body?: React.ReactNode;
}

export interface NavigationButtonsProps {
  handlePreviousFn: () => void;
  handleNextFn: () => void;
  showNextButton?: boolean;
  showPreviousButton?: boolean;
  textPrevious?: string;
  textNext?: string;
}

export interface RegisterLoaderProps {
  stepDone: string[];
  numberOfTraining: number;
  isErrorDuringRegister: boolean;
}

export interface TextStepProgramProps {
  text: string;
  isLoading: boolean;
  isDisplay: boolean;
}

export interface ArticlesDataModalProps {
  visible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export interface ObjectData {
  title: string;
  text: string;
  file: any;
  date: string;
  author: string;
  subject: string;
}

export interface ModalBodyProps {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleButtonFileClick: () => void;
  handleInputFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  objectData: ObjectData;
}

export interface ArticleCardProps {
  article: Article;
}

export interface CarouselProps {
  children: React.ReactNode;
  arrowTopPosition: string;
  carouselWidth: number;
  carouselHeight: number;
}

export interface ProgramCardProps {
  title: string;
  children: React.ReactNode;
  sexe: string;
}

export interface CardioInstructionCardProps {
  instructions: string;
  totalTime: number;
}

export interface SeriesProps {
  series: Series[];
}

export interface SetRendererProps {
  weight: string;
  seriesNumber: number;
  rest: number;
  repetition: number;
}

export type TabsType = "Paramètres" | "Facturation";

export interface CustomTabListProps {
  tabs: TabsType[];
  actualState: TabsType;
  updateState: (state: TabsType) => void;
  size: string;
}

export interface PersonalInfoContainerProps {
  userData: personalInfoSettings;
}

export interface WorkoutParamsContainerProps {
  userData: personalInfoSettings;
  onChangeInput: (inputName: string, event: string | number) => void;
}

export interface NamesContainerProps {
  userData: personalInfoSettings;
  yupErrors: {
    [key: string]: string;
  };
  onChangeInput: (inputName: string, event: string) => void;
}

export interface HeightWeightContainerProps {
  userData: personalInfoSettings;
  yupErrors: {
    [key: string]: string;
  };
  onChangeInput: (inputName: string, event: number) => void;
}

export interface GoalContainerProps {
  userData: personalInfoSettings;
  onChangeInput: (inputName: string, event: string) => void;
  indexGoalTab: 0 | 1 | 2;
}

export interface EmailContainerProps {
  email: string;
  userId: string;
}

export interface PasswordContainerProps {
  email: string;
  userId: string;
}

// export interface FormProviderProps {
//   children: React.ReactNode;
//   handleNextForm: () => void;
//   handlePreviousForm: () => void;
// }
