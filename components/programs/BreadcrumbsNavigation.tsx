import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Icon } from "@tremor/react";
import { IoArrowBackOutline } from "react-icons/io5";

const BreadcrumbsNavigation = () => {
  return (
    <div className="dropdown-absolute">
      <Dropdown>
        <DropdownTrigger>
          <Icon
            className="back-icon"
            icon={IoArrowBackOutline}
            variant={"light"}
            size="md"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="back">TODO: Ajouter le Breadcrumbs</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default BreadcrumbsNavigation;
