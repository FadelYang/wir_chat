import React from 'react'
import HeaderMenuName from '../../atoms/HeaderMenuName';
import Breadcrumb from '../../molecules/Breadcrumb';

const HeaderMenu = ({name, breadcrumbPath}) => {
  return (
    <div className='items-center justify-between block mt-5 md:flex'>
      <HeaderMenuName name={name}/>
      <div>
        <Breadcrumb path={breadcrumbPath}/>
      </div>
    </div>
  )
}

export default HeaderMenu