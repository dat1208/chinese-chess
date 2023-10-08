'use client'
import ZhChess from "zh-chess"
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import React from "react";
import { SOCKET_URL } from "@/scripts/config";
import { getRoom } from "@/scripts/storage";
import { io } from "socket.io-client";
const ChessBoard = () => {
  React.useEffect(() => {
    
    
    return () => {
      
    };
  }, []);
  return (

    
    <>
    <link rel="stylesheet" type="text/css" href="./css/chess/styles.module.css"></link>
      <div className="app">
        <div className="cont-wrap">
          <div className="cont">
            <div className="chs"></div>
            <div className="bg"></div>
          </div>
        </div>

        <Script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossOrigin="anonymous"></Script>

        <Script type="module" src="/js/chess/script.js"></Script>

        
      </div>
      </>
  )
 
   
  
}

export default ChessBoard;
