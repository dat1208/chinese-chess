'use client'
import * as React from 'react';
import ChessBoard from '../components/ChessBoard/ChessBoard';
import ChatPopup from '../components/ChatPopup';
import { GetServerSideProps } from 'next';

export default function RootLayout({ children }: { children: React.ReactNode}) {

  return (
    <div>
      <ChatPopup/>
      <ChessBoard></ChessBoard>
    </div>
  );
}