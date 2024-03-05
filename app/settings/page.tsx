"use client";
/* eslint-disable react/no-unescaped-entities */
import { PersonalInfoContainer } from "@/components/settings/PersonalInfoContainer";
import { EmailContainer } from "@/components/settings/EmailContainer";
import { PasswordContainer } from "@/components/settings/PasswordContainer";
import { useSelector } from "react-redux";
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import { useState } from "react";
import CustomTabList from "@/components/customs/CustomTabList";
import { selectUser } from "@/redux/slices/userSlice";
import { TabsType } from "@/types/propsTypes";
import { PersonalInfoSettings } from "@/types/userDataTypes";

export default function Settings() {
  const userData = useSelector(selectUser);
  const [isClickedSettingsPage, setIsClickedSettingsPage] =
    useState<TabsType>("Paramètres");
  //TODO: Modifier l'état de l'utilisateur dans le store lors de la modification de ses données

  const {
    email,
    age,
    id,
    isUserSubscribed,
    role,
    sexe,
    registrationDate,
    programs,
    isUserAuthenticated,
    exoPerformances,
    subStatus,
    ...rest
  } = userData;
  const personalInfoSettings = rest as PersonalInfoSettings;

  return (
    <main className="page">
      {userData.email ? (
        <div className="setting-container">
          <CustomTabList
            tabs={["Paramètres", "Facturation"]}
            actualState={isClickedSettingsPage}
            updateState={setIsClickedSettingsPage}
            size=""
          />

          {isClickedSettingsPage === "Facturation" ? (
            <>
              <span>Cette page n'est pas encore disponible.</span>
            </>
          ) : (
            <>
              <TabGroup
                defaultIndex={0}
                className="flex flex-col items-center justify-center mt-5"
              >
                <TabList
                  className="mt-8 flex items-center justify-center"
                  variant={"solid"}
                >
                  <Tab
                    icon={BiSolidUserDetail}
                    className="w-[190px] flex items-center justify-center"
                  >
                    Nom et programmes
                  </Tab>
                  <Tab
                    icon={MdOutlineAlternateEmail}
                    className="w-[190px] flex items-center justify-center"
                  >
                    Email
                  </Tab>
                  <Tab
                    icon={MdPassword}
                    className="w-[190px] flex items-center justify-center"
                  >
                    Mot de passe
                  </Tab>
                </TabList>
                <TabPanels className="flex items-center justify-center">
                  <TabPanel>
                    <div className="mt-10 flex items-center justify-center">
                      <PersonalInfoContainer userData={personalInfoSettings} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="mt-10 flex items-center justify-center">
                      <EmailContainer email={email} userId={id} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="mt-10 flex items-center justify-center">
                      <PasswordContainer email={email} userId={id} />
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </>
          )}
        </div>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </main>
  );
}
