import { NavLink } from "react-router";
import { GoGraph } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { BsAlphabetUppercase } from "react-icons/bs";

import useSearchKeyword from "../store/useSearchKeyword";

const Header = () => {
  const keyword = useSearchKeyword((state) => state.keyword);
  const checkKeyword = keyword ? keyword : `""`;

  const navLists = [
    {
      link: `/related?keyword=${checkKeyword}`,
      icon: <GoGraph size={40} />,
      name: "언급량 분석",
    },
    { link: "/news", icon: <LuNewspaper size={40} />, name: "연관어 분석" },
    {
      link: `/word-division?keyword=${checkKeyword}`,
      icon: <BsAlphabetUppercase size={40} />,
      name: "긍 부정 분석",
    },
  ];
  return (
    <header className="flex">
      <nav className="">
        <h1 className="text-5xl">파이웍스</h1>
        <ul className="flex flex-col mt-8">
          {navLists.map(({ link, icon, name }, index) => (
            <li key={`${link} + ${index}`} className="px-4 mb-4">
              <NavLink to={link} className="flex place-items-center gap-4">
                {icon} {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
