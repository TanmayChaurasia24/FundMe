"use client"
import React from 'react';
import { SessionProvider } from "next-auth/react";

type SessionWrapperProps = {
  children: React.ReactNode;
  session: any;
};

const SessionWrapper: React.FC<SessionWrapperProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;

