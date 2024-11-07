import { useState } from 'react'
import NavBar from '../components/NavBar'
import { marked } from 'marked'

export default function HomePage() {
  const exampleMessage = "saya ingin membuat metaverse, siapa yang harus saya hubungi?"

  const exampleResponse = `Untuk membuat metaverse, Anda dapat mempertimbangkan beberapa pihak yang mungkin bisa membantu atau memiliki
peran penting dalam pengembangan proyek metaverse tersebut. Berikut adalah beberapa contoh:\n\n1. **Perusahaan teknologi**: Perusahaan-perusahaan seperti Meta (sebelumnya Facebook), Google, Microsoft, dan Amazon yang sudah memiliki
pengalaman dalam pengembangan teknologi virtual dan augmented reality (VR/AR) bisa menjadi pilihan.\n2. **Perusahaan blockchain**: Perusahaan-perusahaan yang fokus pada teknologi blockchain seperti Coinbase, Binance, atau ConsenSys bisa
membantu dengan integrasi blockchain ke dalam proyek metaverse Anda.\n3. **Perusahaan gaming**: Perusahaan-perusahaan
gaming seperti Unity Technologies (yang juga memiliki peran dalam pengembangan VR/AR) atau Epic Games bisa memberikan
dukungan teknis dan sumber daya untuk pengembangan metaverse.\n4. **Institusi penelitian**: Institusi penelitian yang
fokus pada teknologi metaverse, seperti University of California, Los Angeles (UCLA), atau Massachusetts Institute of
Technology (MIT), bisa menyediakan sumber daya dan pengetahuan tentang teknologi terkait.\n5. **Konsultan teknologi**:
Konsultan teknologi yang spesialisasi dalam pengembangan proyek metaverse seperti WIR Group bisa membantu Anda dengan
strategi bisnis, desain sistem, dan implementasi teknologi.\n\nUntuk memulai, Anda mungkin ingin mempertimbangkan untuk
menghubungi beberapa pihak ini untuk mendapatkan informasi lebih lanjut tentang potensi kerja sama atau dukungan yang
dapat diberikan.`

  const formattedResponse = marked(exampleResponse)

  const [message, setMessage] = useState('')

  function handleMessageInput(e) {
    setMessage(e.target.value)
    e.target.style.height = '3rem'
    e.target.style.height = `${e.target.scrollHeight}px`
    console.log(process.env.backend_url);
    console.log(message);
  }

  function getAnswer(e) {
    e.preventDefault()

    const data = {
      message: message
    }

    // fetch(process.env.BACK)
  }

  return (
    <div className=''>
      <NavBar />
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="flex flex-col flex-grow">
          {/* Chat area */}
          <div className={`${!exampleResponse ? 'hidden' : 'flex'} flex-col items-center chat-area flex-grow md:px-56 px-20 gap-10`}>
              {/* Use dangerouslySetInnerHTML to inject the HTML */}
              <div className='ml-auto bg-slate-100 py-2 px-4 rounded-2xl'>{exampleMessage}</div>
              <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />
              <div className='ml-auto bg-slate-100 py-2 px-4 rounded-2xl'>{exampleMessage}</div>
              <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />
          </div>

          {/* Input area */}
          <div className={`sticky bottom-0 bg-white p-3 ${!exampleResponse ? 'my-auto' : ''}`}>
            <div className="flex gap-1 justify-center">
              <textarea
                value={message}
                onChange={handleMessageInput}
                type="text"
                placeholder="Kirim pertanyaan"
                className="border border-black rounded-xl px-5 py-2 w-1/2 h-11 max-h-36 resize-none"
              />
              <button className="rounded-xl text-white bg-black px-5 h-12 flex-shrink-1 items-start self-end">
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}