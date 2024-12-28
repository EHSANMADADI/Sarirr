/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import logo from "../../IMG/logo.png";
export default function HeaderContainer() {
  return (
    <div className="p-8 flex justify-center items-center ">
        <span>
          <img className="md:w-28 md:h-28 h-20 w-20 mx-2 pt-0 pb-4" src={logo} />
        </span>
        <h2 className="text-blue-800 font-black md:text-5xl text-2xl font-nastaliqh">
          ابزار های هوشمند سریر
        </h2>
      </div>
  )
}
