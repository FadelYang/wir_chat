import React from 'react';

const Button = ({
  children,
  style,
  onClick,
  className,
  type,
  value
}) => {
  return (
    <button style={style} onClick={onClick} className={className} type={type} value={value}>
      {children}
    </button>
  );
};

export default Button;