import { GiCheckMark } from "react-icons/gi";

interface SocialNetworksProps {
  socialNetworks: string[];
  selectSns: string[];
  toggleSns: (_: string) => void;
}

const SocialNetworks = ({
  socialNetworks,
  selectSns,
  toggleSns,
}: SocialNetworksProps) => {
  return (
    <ul className="flex justify-between w-[100%]">
      {socialNetworks.map((item, index) => (
        <li
          key={`${item} + ${index}`}
          className="flex place-items-center w-[31%] relative"
        >
          <label
            htmlFor={item}
            className={`flex w-full py-2 px-4 rounded-lg cursor-pointer ${
              selectSns.includes(item)
                ? "bg-[#FED430] text-[#333333]"
                : "bg-[#E4EAF2] "
            }`}
          >
            {item}
          </label>
          <input
            type="checkbox"
            id={item}
            className="hidden"
            checked={selectSns.includes(item)}
            onChange={() => toggleSns(item)}
          />
          <GiCheckMark className="absolute right-4" />
        </li>
      ))}
    </ul>
  );
};

export default SocialNetworks;
