import * as React from 'react';
import ChessBoard from '../components/ChessBoard/ChessBoard';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <ChessBoard></ChessBoard>
      </div>
  );
}