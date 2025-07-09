import {
  BellIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UsersIcon,
  UserGroupIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import features from "../(data)/features";
import { Descriptions } from "../Types/AboutDescription";
import SvgIcon from "./SvgIcon";
import DescriptionContainer from "./DescriptionContainer";
import Description from "./Description";
import CardContainer from "./CardContainer";

const typedDescriptions: Descriptions[] = features;

const iconMap: Record<string, React.ElementType> = {
  BellIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UsersIcon,
  UserGroupIcon,
  ArrowDownTrayIcon,
};

function AboutFeatures() {
  return (
    <div>
      {typedDescriptions.map((feature, index) => {
        const IconComponent = iconMap[feature.icon];

        if (!IconComponent) {
          return null;
        }

        return (
          <CardContainer key={index}>
            <SvgIcon>
              <IconComponent className="w-[24px]" />
            </SvgIcon>

            <DescriptionContainer title={feature.title}>
              <Description text={feature.text} />
            </DescriptionContainer>
          </CardContainer>
        );
      })}
    </div>
  );
}

export default AboutFeatures;
