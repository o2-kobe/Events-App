interface HeaderProps {
  tilte: string;
}

function Header({ tilte }: HeaderProps) {
  return (
    <p className="text-[#121416] text-base font-medium leading-normal line-clamp-1">
      {tilte}
    </p>
  );
}

export default Header;
