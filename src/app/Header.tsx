import { NavLink } from "react-router";

import Talk from "../assets/talk.svg";
import Chain from "../assets/chain.svg";
import YesOrNo from "../assets/yesOrNo.svg";
import Graph from "../assets/graph.svg";
import Logo from "../assets/logo.svg";

const Header = () => {
  const navLists = [
    {
      link: `/mention`,
      icon: <img src={Talk} alt="icon" className="w-[20px]" />,
      name: "언급량 분석",
    },
    {
      link: `/related`,
      icon: <img src={Chain} alt="icon" className="w-[20px]" />,
      name: "연관어 분석",
    },
    {
      link: `/sentiment`,
      icon: <img src={YesOrNo} alt="icon" className="w-[20px]" />,
      name: "긍•부정 분석",
    },
    {
      link: "/sum&pre",
      icon: <img src={Graph} alt="icon" className="w-[20px]" />,
      name: "요약&예측",
    },
  ];
  return (
    <header className="w-[15%]">
      <nav>
        <div className="flex place-items-center w-full h-24">
          <NavLink
            to="/"
            className="w-[86px] h-[86px] flex justify-center items-center border border-black rounded-lg mr-3"
          >
            <img src={Logo} alt="logo" className="w-[60px]" />
          </NavLink>
          <div>
            <h1 className="text-3xl font-extrabold">파이웍스</h1>
            <p className="text-lg font-bold">AI 빅데이터 R&D</p>
          </div>
        </div>
        <ul className="flex flex-col mt-8">
          {navLists.map(({ link, icon, name }, index) => (
            <li key={`${link} + ${index}`} className="mb-2 w-[85%]">
              <NavLink
                to={link}
                className={({ isActive }) =>
                  `flex place-items-center gap-4 p-4 text-lg font-bold text-black rounded-lg ${
                    isActive
                      ? "bg-[#fed430] border-l-4 border-black" // Active 상태일 때 스타일
                      : "hover:bg-gray-200" // 기본 상태 스타일
                  }`
                }
              >
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
