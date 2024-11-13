import profilePlaceholder from './../assets/profile-placeholder.jpeg'
import wirLogo from '/wir.png'

export default function () {
  const clearChat = (e) => {
    e.preventDefault()

    const confirmed = window.confirm('Apakah kamu yakin? chat yang ada sekarang akan terhapus')

    if (confirmed) {
      localStorage.removeItem('conversations')
      localStorage.removeItem('sessionId')
      window.location.reload()
    }
  }

  return (
    <>
      <div className="sticky top-0 z-10 px-5 py-5 bg-white md:px-20">
        <div className='container flex mx-auto'>
          <div className='flex items-center gap-2'>
            <img src={wirLogo} className='w-10'/>
            <div>WIR Chat</div>
          </div>
          <div className='flex items-center ms-auto'>
            <button onClick={clearChat} className='px-5 py-2 text-xs text-white bg-gray-900 md:text-sm rounded-xl hover:bg-black hover:cursor-pointer'>Mulai Chat Baru</button>
            {/* <img src={profilePlaceholder} className="w-10 rounded-full" /> */}
          </div>
        </div>
      </div>
    </>
  )
}