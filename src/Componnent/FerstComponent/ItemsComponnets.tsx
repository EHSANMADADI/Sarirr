/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import {useNavigate } from "react-router-dom";
interface ItemsType {
  id: number;
  title: string;
  discription: string;
  link: string;
  bgClassName: string;
}

export default function ItemsComponents({
  id,
  title,
  discription,
  link,
  bgClassName,
}: ItemsType) {
  const navigate = useNavigate();
  return (
    <div
      onClick={()=>navigate(link)}
      className="flex flex-col cursor-pointer justify-between max-w-sm w-96  bg-white border border-gray-200 rounded-tl-3xl rounded-tr-3xl shadow mb-5 hover:border-blue-700 hover:border-2 duration-100"
      
    >
      <div
        className={`${bgClassName} w-full rounded-tl-3xl rounded-tr-3xl sm:h-96 h-[17.8rem] relative overflow-hidden`}
      >
        <a
          target="_blank"
          href={link}
          className="sm:absolute z-50 inset-0 sm:flex hidden bg-black  bg-opacity-30 sm:h-[20.7rem]  items-center justify-center text-white text-xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          ورود به وب سایت
          <span className="text-4xl">
            <HiExternalLink />
          </span>
        </a>
      </div>

      {/* بخش توضیحات */}
      <div className="md:p-5 p-3 flex flex-col sm:h-44 h-32">
        <a href={link}>
          <h5 className=" text-2xl font-bold tracking-tight text-blue-900">
            {title}
          </h5>
        </a>
        <p
          className="font-medium text-lg text-gray-700 mt-3"
          style={{ textAlign: "justify" }}
        >
          {discription}
        </p>
      </div>
    </div>
  );
}
