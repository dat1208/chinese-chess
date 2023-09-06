// components/Loading.tsx
import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../json/loadingAnimation.json";


const Loading: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      <div style={{width: 300}} className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Lottie loop={true} animationData={loadingAnimation} />
      </div>
      
    </div>
  );
};

export default Loading;
