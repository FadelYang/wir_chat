import profilePlaceholder from './../assets/profile-placeholder.jpeg'

export default function () {
  return (
    <>
      <div className="top-0 bg-white sticky z-10 py-5">
        <div className='flex container mx-auto'>
          <div>WIR Chat</div>
          <div className='ms-auto'>
            <img src={profilePlaceholder} className="w-10 rounded-full" />
          </div>
        </div>
      </div>
    </>
  )
}