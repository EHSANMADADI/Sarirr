/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useStore } from "../../Store/Store";
export default function SelectRole() {
  const [selectValue, setSelectValue] = useState("");
  const { characterValue, addCharacterValue } = useStore();
  const ItemSelect = [
    "حرف کوچک",
    "حرف بزرگ",
    "عدد",
    "عدد حروف کوچک",
    "عدد حروف بزرگ",
    "کاراکتر های خاص",
    "ترکیبی",
    "بیت",
  ];
  useEffect(() => {
    addCharacterValue(selectValue);
    console.log(characterValue);
    
  }, [selectValue]);
  return (
    <div>
      <select
        onChange={(e) => setSelectValue(e.target.value)}
        dir="rtl"
        className="rounded-lg border-2 border-blue-600 w-36 text-center"
      >
        {ItemSelect.map((item, index) => (
          <option key={index} value={item} className="text-center">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
