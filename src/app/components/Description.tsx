interface DescriptionProps {
  text: string;
}

function Description({ text }: DescriptionProps) {
  return (
    <p className="text-[#6a7681] text-sm font-normal leading-normal line-clamp-2">
      {text}
    </p>
  );
}

export default Description;
