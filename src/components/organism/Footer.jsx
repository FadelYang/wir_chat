import React from 'react'

const Footer = () => {
  return (
    <div className='text-center mt-auto'>v.{process.env.REACT_APP_CURRENT_VERSION}</div>
  )
}

export default Footer