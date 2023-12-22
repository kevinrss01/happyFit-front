import React from "react";
import { CustomTabsProps } from "@/types/propsTypes";
import { Tab, Tabs } from "@nextui-org/react";

const CustomTabs: React.FC<CustomTabsProps> = ({
  label,
  ariaLabel,
  color,
  variant,
  selectedKey,
  onKeyChange,
  typeKey,
  className,
  tabs,
}) => {
  return (
    <>
      <label>{label}</label>
      <Tabs
        aria-label={ariaLabel}
        color={color}
        variant={variant}
        selectedKey={selectedKey}
        onSelectionChange={(key) => onKeyChange(key, typeKey)}
        className={className}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            title={
              <div className="flex items-center space-x-2">
                {tab.icon}
                <span>{tab.title}</span>
              </div>
            }
            isDisabled={tab.isDisabled}
          >
            {tab.body}
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default CustomTabs;
