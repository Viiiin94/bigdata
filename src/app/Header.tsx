import { NavLink } from "react-router";
import { GoGraph } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { BsAlphabetUppercase } from "react-icons/bs";

const Header = () => {
  return (
    <header className="flex justify-center place-items-center h-12">
      <nav className="flex gap-8">
        <NavLink to="/">
          <GoGraph size={40} />
        </NavLink>
        <NavLink to="/news">
          <LuNewspaper size={40} />
        </NavLink>
        <NavLink to="/word-division">
          <BsAlphabetUppercase size={40} />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
