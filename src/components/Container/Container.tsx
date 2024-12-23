import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <section className="bg-inherit grid grid-cols-[3fr_5fr] grid-rows-[1fr] gap-8">
      {children}
    </section>
  );
};

export default Container;
