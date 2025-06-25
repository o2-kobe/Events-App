import React from "react";

interface SvgIconProps {
  width?: string;
  height?: string;
  fill?: string;
  children?: React.ReactNode;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  children,
  width = "24px",
  height = "24px",
  fill = "currentColor",
}) => (
  <div
    className="text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f2f5] shrink-0 size-12"
    data-icon="Calendar"
    data-size="24px"
    data-weight="regular"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
    >
      {children}
    </svg>
  </div>
);

export default SvgIcon;
