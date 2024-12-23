interface Props {
  children: React.ReactNode;
}

const AsideContainer = ({ children }: Props) => {
  return (
    <aside className="bg-white rounded-lg h-full py-8 px-8">{children}</aside>
  );
};

export default AsideContainer;
