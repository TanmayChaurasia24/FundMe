import React from 'react';

type SessionWrapperProps = {
  children: React.ReactNode;
};

const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default SessionWrapper;
