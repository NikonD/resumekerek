import React, { Component } from 'react';

interface PDFCardProps {
  onClick: ()=>void,
  children: React.ReactNode
}

export const PDFCard: React.FC<PDFCardProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} style={{minWidth: "200px", minHeight: "400px", width: "300px", whiteSpace:"normal"}} className="relative hover:bg-gray-100 bg-white shadow-md p-6 break-words">
      {children}
    </div>
  );
};