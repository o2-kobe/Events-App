import {
  BellIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  Bars3Icon,
  StarIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import items from "../data/data.json";
import { Descriptions } from "../Types/AboutDescription";
import SvgIcon from "./SvgIcon";
import DescriptionContainer from "./DescriptionContainer";
import Description from "./Description";
import CardContainer from "./CardContainer";

const typedDescriptions: Descriptions[] = items;

const iconMap: Record<string, React.ElementType> = {
  BellIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  Bars3Icon,
  StarIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
};

function AboutFeatures() {
  return (
    <>
      {typedDescriptions.map((item, index) => {
        const IconComponent = iconMap[item.icon];

        if (!IconComponent) {
          return null;
        }

        return (
          <CardContainer key={index}>
            <SvgIcon>
              <IconComponent className="w-[24px]" />
            </SvgIcon>

            <DescriptionContainer title={item.title}>
              <Description text={item.text} />
            </DescriptionContainer>
          </CardContainer>
        );
      })}
    </>
  );
}

export default AboutFeatures;
