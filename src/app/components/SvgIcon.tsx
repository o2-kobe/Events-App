import React from "react";

interface SvgIconProps {
  children?: React.ReactNode;
}

const SvgIcon: React.FC<SvgIconProps> = ({ children }) => (
  <div className="text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f2f5] shrink-0 size-12">
    {children}
  </div>
);

export default SvgIcon;
