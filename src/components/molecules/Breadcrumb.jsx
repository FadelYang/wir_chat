import React from "react";
import {Link} from "react-router-dom";

const Breadcrumb = ({path}) => {
  return (
    <div>
      {path.map((item, index) => (
        <span key={index} className="inline-block">
          <Link
            to={item.path}
            className={`capitalize hover:underline ${index === path.length - 1 ? 'text-[#3C50E0]' : 'text-[#64748B]'}`}
          >
            {item.name}
          </Link>
          {index < path.length - 1 && (
            <span className="mx-2 text-gray-500">/</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
