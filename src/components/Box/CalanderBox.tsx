import { ChangeEvent } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface CalanderBoxProps {
  decrementYear: () => void;
  incrementYear: () => void;
  getYear: string;
  onChangeMonth: (_: ChangeEvent<HTMLInputElement>) => void;
  selectMonth: string;
  calander: string[];
}

const CalanderBox = ({
  decrementYear,
  incrementYear,
  getYear,
  onChangeMonth,
  selectMonth,
  calander,
}: CalanderBoxProps) => {
  return (
    <>
      <div className="flex flex-row place-itmes-center place-content-center gap-2 mb-2 relative">
        <MdKeyboardArrowLeft
          size={24}
          onClick={decrementYear}
          className="cursor-pointer"
        />
        <p>{getYear}</p>
        <MdKeyboardArrowRight
          size={24}
          onClick={incrementYear}
          className="cursor-pointer"
        />
      </div>
      <div>
        <ul className="grid grid-cols-6">
          {calander.map((item, index) => (
            <li key={`${item} + ${index}`} className="text-center p-1">
              <label
                htmlFor={item}
                className={`block cursor-pointer rounded-3xl ${
                  selectMonth === item
                    ? "bg-black text-white"
                    : "bg-inherit text-gray-600"
                }`}
              >
                {item}
              </label>
              <input
                type="checkbox"
                id={item}
                className="hidden"
                checked={selectMonth === item}
                onChange={onChangeMonth}
                value={item}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CalanderBox;
