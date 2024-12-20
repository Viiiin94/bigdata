import { NavLink } from "react-router";
import { GoGraph } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { BsAlphabetUppercase } from "react-icons/bs";
import SearchForm from "../components/Form/SearchForm";

const Header = () => {
  const navLists = [
    { link: "/related", icon: <GoGraph size={40} /> },
    { link: "/news", icon: <LuNewspaper size={40} /> },
    { link: "/word-division", icon: <BsAlphabetUppercase size={40} /> },
  ];
  return (
    <header className="flex justify-center place-items-center">
      <nav className="flex my-4 justify-between gap-60">
        <SearchForm />
        <ul className="flex gap-8 place-items-center">
          {navLists.map(({ link, icon }, index) => (
            <li key={`${link} + ${index}`}>
              <NavLink to={link}>{icon}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
