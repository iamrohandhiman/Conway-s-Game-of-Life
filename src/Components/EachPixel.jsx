import React from 'react';

export const EachPixel = React.memo(({ isAlive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer h-8 w-8 border-[0.5px]  hover:bg-slate-700  ${
        isAlive
          ? 'bg-gray-200 shadow-sm shadow-white'
          : 'bg-gray-950 border-gray-900'
      }`}
    />
  );
});
