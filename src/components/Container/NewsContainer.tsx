import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const NewsContainer = ({ title, children }: Props) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[720px] border-box border border-[#898989] rounded-xl">
        <div className="p-6 border-b border-[#333]">
          <h1 className="text-2xl">{title}</h1>
        </div>
        <div className="h-fit">{children}</div>
      </div>
    </div>
  );
};

export default NewsContainer;
