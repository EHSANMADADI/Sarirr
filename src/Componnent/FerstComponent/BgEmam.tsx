import React from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useStore } from "../../Store/Store";
interface BgEmamProps {
  onScrollDown: () => void;
}

export default function BgEmam({ onScrollDown }: BgEmamProps) {
  const { IsAdmin } = useStore();
  return (
    <div className="w-full mx-auto h-screen hero-banr p-0 m-0 relative">
      {IsAdmin && (
        <div className="absolute top-2  left-2 flex items-center justify-start text-blue-600 md:text-6xl text-3xl cursor-pointer hover:scale-105 duration-200">
          <Link to="/AdminPanel">
            <BsPersonVcard />
            <div className="text-sm">AdminPanel</div>
          </Link>
        </div>
      )}

      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center text-4xl text-white justify-center z-50 animate-pulse cursor-pointer"
        onClick={onScrollDown}
      >
        <FaAngleDoubleDown />
      </div>
    </div>
  );
}
