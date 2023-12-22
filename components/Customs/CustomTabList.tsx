import { Fragment } from "react";
import { CustomTabListProps } from "@/types/propsTypes";

const CustomTabList = ({
  tabs,
  actualState,
  updateState,
  size,
}: CustomTabListProps) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => {
        return (
          <Fragment key={`custom tab n°${index}`}>
            <div
              className={actualState === tab ? "tab clicked" : "tab"}
              onClick={() => {
                updateState(tab);
              }}
              key={`tab-${index}`}
              style={{
                height: size === "small" ? 40 : 50,
                minWidth: size === "small" ? 190 : 200,
              }}
            >
              {tab}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default CustomTabList;
