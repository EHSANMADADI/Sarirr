/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useEffect, useRef } from "react";

export const LLMBody = () => {
  // const ifrem=useRef(null)
  // console.log(ifrem);
  // useEffect(()=>{
  //    console.log(ifrem);

  // },[])

  return (
    <div className="w-full h-full">
      <iframe
        // ref={ifrem}
        className="w-full h-full"
        src="http://195.191.45.56:17022/auth"
      ></iframe>
    </div>
  );
};
