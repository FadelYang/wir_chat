import profilePlaceholder from './../assets/profile-placeholder.jpeg'

export default function () {
  return (
    <>
      <div className="sticky top-0 z-10 py-5 bg-white">
        <div className='container flex mx-auto'>
          <div>WIR Chat</div>
          <div className='ms-auto'>
            {/* <img src={profilePlaceholder} className="w-10 rounded-full" /> */}
          </div>
        </div>
      </div>
    </>
  )
}