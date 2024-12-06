import React from 'react';

const Button = ({
  children,
  style,
  onClick,
  className,
  type
}) => {
  return (
    <button style={style} onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;