import React, { useState } from 'react'
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from '../Share/TitleDetails';
export default function GitiNamaComponent() {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="overflow-hidden mx-auto h-screen">
    <HeaderMenue />
    <div className="pb-10 overflow-auto h-[90vh] w-full bg-blue-50 font-Byekan">
      {/* <TitleDetails
        title={"ابزار تشخیص مکان تصویر"}
        detailes={
          "فناوری ای است که مکان تصویر را شناسایی میکند"
        }
      /> */}
       <div className="w-full h-full">
      {isLoading && (
        <div className="w-full flex justify-center h-full items-center">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
       
          </div>
        </div>
      )}
      <iframe
        className="w-full h-full z-0"
        src="https://gitinama.tadbirserver.ir/fa"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
      
    </div>
  </div>
  )
}
