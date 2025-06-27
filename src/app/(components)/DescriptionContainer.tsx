interface DescriptionContainerProps {
  title: string;
  children: React.ReactNode;
}

function DescriptionContainer({ children, title }: DescriptionContainerProps) {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-[#121416] text-base font-medium leading-normal line-clamp-1">
        {title}
      </p>
      {children}
    </div>
  );
}

export default DescriptionContainer;
