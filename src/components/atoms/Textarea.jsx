import React from 'react';

const Textarea = ({
  children,
  style,
  onClick,
  className,
  value,
  onChange,
  onKeyDown,
  type,
  id,
  placeholder,

}) => {
  return (
    <textarea
      style={style}
      onClick={onClick}
      className={className}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      id={id}
      placeholder={placeholder}
      required
    >
      {children}
    </textarea>
  );
};

export default Textarea;