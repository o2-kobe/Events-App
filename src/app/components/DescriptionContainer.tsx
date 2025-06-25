interface DescriptionContainerProps {
  children: React.ReactNode;
}

function DescriptionContainer({ children }: DescriptionContainerProps) {
  return <div className="flex flex-col justify-center">{children}</div>;
}

export default DescriptionContainer;
