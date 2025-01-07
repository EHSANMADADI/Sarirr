import React from 'react'
import HeaderMenue from '../Share/HeaderMenue'
import TitleDetails from '../Share/TitleDetails'
import {LLMBody} from './LLMBody'
import './style.css'
export default function LLMUIComponnent() {
  return (
    <div className='overflow-hidden mx-auto h-screen'>
    <HeaderMenue />
    <div className="pb-10 overflow-auto h-[90vh] w-full bg-blue-50 font-Byekan">
      <TitleDetails
        title={"رابط کاربری مدل های زبانی "}
        detailes={
          ""
        }
      />
     <LLMBody/>
    </div>
  </div>
  )
}
