import React, { Component } from 'react';

interface PDFCardProps {
  children: React.ReactNode
}

export const PDFCard: React.FC<PDFCardProps> = ({ children }) => {
  return (
    <div style={{minWidth: "200px", minHeight: "250px"}} className="relative hover:bg-gray-100 bg-white shadow-md p-6 ">
      {children}
    </div>
  );
};