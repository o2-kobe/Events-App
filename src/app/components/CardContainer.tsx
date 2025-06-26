interface CardContainerProps {
  children: React.ReactNode;
}

function CardContainer({ children }: CardContainerProps) {
  return (
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
      {children}
    </div>
  );
}

export default CardContainer;
