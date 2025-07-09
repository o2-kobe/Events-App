"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FAQCardProps {
  pos: number;
  question: string;
  answer: string;
}

export default function FAQCard({ pos, question, answer }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((open) => !open);
  return (
    <div onClick={handleClick} className=" bg-[#f0f2f5] px-4">
      <div className="flex items-center gap-2 justify-between py-2 ">
        <div className="flex items-start">
          <span className="mr-2">{pos}.</span>
          <h4 className="text-[#121416] leading-normal">{question}</h4>
        </div>
        <span>
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </span>
      </div>
      {isOpen ? (
        <p className="text-[#6a7681] text-sm font-normal leading-normal">
          {answer}
        </p>
      ) : null}
    </div>
  );
}
