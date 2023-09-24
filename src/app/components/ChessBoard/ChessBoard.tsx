'use client'
import ZhChess from "zh-chess"
import { useEffect, useRef, useState } from "react";
const ChessBoard = () => {
 
  const [gameInstance, setGame] = useState<ZhChess | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvas.current) {
      const CTX_WIDTH = 700, CTX_HEIGHT = 700,ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D;
      const game = new ZhChess({
      ctx,
      gameHeight: CTX_HEIGHT,
      gameWidth: CTX_WIDTH,

  })
      game.gameStart("RED")
      game.gameOver();
    canvas.current.addEventListener("click", game.listenClickAsync, false)
      setGame(game)
    }
  }, [canvas])
  return <div className="app">
    <canvas ref={canvas} width="700" height="700" style={{width:700,height:700}} />
  </div>
}

export default ChessBoard;
