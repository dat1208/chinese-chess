'use client'
import Script from 'next/script';
import React from 'react';
 
const ChessBoard: React.FC = () => {

  return (
    <div
     
    >
      <div id="board1" style={{width:450}}></div>

      
      <Script src='/js/chess/script.js'></Script>
      <Script src = '/xiangqiboardjs/js/xiangqiboard-0.3.3.js'></Script>
      <Script src = '/xiangqiboardjs/js/xiangqiboard-0.3.3.min.js'></Script>
      
    </div>
  );
};

export default ChessBoard;
