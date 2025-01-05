/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";

export const LLMBody = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
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
        src="http://195.191.45.56:17022/auth"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};
