import React from "react";

const BaseModal = (props) => {
  const {children} = props;
  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-50"></div>
      <div className="fixed inset-0 z-30 flex items-center justify-center">
        <div className={`bg-white rounded-lg shadow p-6`}>{children}</div>
      </div>
    </>
  );
};

export default BaseModal;
