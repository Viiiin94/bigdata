interface Props {
  children: React.ReactNode;
}

const ArticleContainer = ({ children }: Props) => {
  return (
    <article className="bg-[#DCE4F1] rounded-lg h-full py-8 px-8">
      {children}
    </article>
  );
};

export default ArticleContainer;
