import { NavLink } from "react-router";
import { GoGraph } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { BsAlphabetUppercase } from "react-icons/bs";
import { GiTalk } from "react-icons/gi";

const Header = () => {
  const navLists = [
    {
      link: `/mention`,
      icon: <GiTalk size={20} />,
      name: "언급량 분석",
    },
    {
      link: `/related`,
      icon: <GoGraph size={20} />,
      name: "연관어 분석",
    },
    {
      link: `/sentiment`,
      icon: <BsAlphabetUppercase size={20} />,
      name: "긍•부정 분석",
    },
    { link: "/news", icon: <LuNewspaper size={20} />, name: "요약&예측" },
  ];
  return (
    <header className="flex w-[15%]">
      <nav className="">
        <h1 className="text-5xl">파이웍스</h1>
        <ul className="flex flex-col mt-8">
          {navLists.map(({ link, icon, name }, index) => (
            <li key={`${link} + ${index}`} className="mb-2">
              <NavLink to={link} className="flex place-items-center gap-4 p-4">
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
