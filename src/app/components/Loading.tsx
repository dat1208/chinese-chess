// components/Loading.tsx
import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../json/loadingAnimation.json";


const Loading: React.FC = () => {
  return (
    <div style={{width: 100}} className="loading ml-5">
      {/* You can add loading animations or a loading message here */}
      <Lottie loop={true} animationData={loadingAnimation} />
    </div>
  );
};

export default Loading;
