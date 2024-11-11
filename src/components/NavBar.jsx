import profilePlaceholder from './../assets/profile-placeholder.jpeg'
import wirLogo from '/wir.png'

export default function () {
  return (
    <>
      <div className="sticky top-0 z-10 py-5 bg-white">
        <div className='container flex mx-auto'>
          <div className='flex items-center gap-2'>
            <img src={wirLogo} className='w-10'/>
            <div>WIR Chat</div>
          </div>
          <div className='ms-auto'>
            {/* <img src={profilePlaceholder} className="w-10 rounded-full" /> */}
          </div>
        </div>
      </div>
    </>
  )
}