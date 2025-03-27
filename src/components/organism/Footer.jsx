import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full text-center mt-auto bg-white'>v.{process.env.REACT_APP_CURRENT_VERSION}</div>
  )
}

export default Footer