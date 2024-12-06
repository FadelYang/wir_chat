import React from 'react';

const Button = ({ children, style, onClick, className }) => {
  return (
    <button style={style} onClick={onClick} className={className} >
      {children}
    </button>
  );
};

export default Button;