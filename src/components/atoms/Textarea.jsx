import React from 'react';

const Textarea = ({ children, style, onClick, className }) => {
  return (
    <textarea style={style} onClick={onClick} className={className}>
      {children}
    </textarea>
  );
};

export default Textarea;