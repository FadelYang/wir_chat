import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { marked } from 'marked'

export default function HomePage() {
  const [inputMessage, setInputMessage] = useState('')
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem('sessionId') || '')
  const [conversations, setConversations] = useState(() => {
    const savedConverstations = sessionStorage.getItem('conversations')
    return savedConverstations ? JSON.parse(savedConverstations) : []
  })

  // If sessionId or message change, update the conversations and sessionId value
  useEffect(() => {
    sessionStorage.setItem('conversations', JSON.stringify(conversations))
    sessionStorage.setItem('sessionId', sessionId)
  }, [conversations, sessionId]);

  function handleMessageInput(e) {
    setInputMessage(e.target.value)
    e.target.style.height = '3rem'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const sendQuestionMessage = async (e) => {
    e.preventDefault()

    const newInputMessage = { isUser: true, text: inputMessage }
    setConversations((previousMessage) => [...previousMessage, newInputMessage])

    const data = {
      message: inputMessage
    }

    const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const answer = await response.json()

    if (!sessionId && data.session_id) {
      setSessionId(data.session_id)
    }

    const formattedBotMessage = marked(answer.outputs[0].outputs[0].results.message.data.text)
    const botMessage = { isUser: false, text: formattedBotMessage }
    setConversations((previousMessage) => [...previousMessage, botMessage])
  }

  return (
    <div className=''>
      <NavBar />
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="flex flex-col flex-grow">
          {/* Chat area */}
          <div className={`${!conversations ? 'hidden' : 'flex'} flex-col chat-area flex-grow md:px-56 px-20 gap-10 mt-10`}>
            {conversations.map((message, index) => (
              <div
                key={index}
                className={message.isUser ? "ml-auto bg-slate-100 py-2 px-4 rounded-2xl" : "bot-message"}
              >
                {message.isUser ? (
                  message.text
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                )}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className={`sticky bottom-0 bg-white p-3 ${!conversations ? 'my-auto' : ''}`}>
            <div className="flex gap-1 justify-center">
              <textarea
                value={inputMessage}
                onChange={handleMessageInput}
                type="text"
                placeholder="Kirim pertanyaan"
                className="border border-black rounded-xl px-5 py-2 w-1/2 h-11 max-h-36 resize-none"
              />
              <button onClick={sendQuestionMessage} className="rounded-xl text-white bg-black px-5 h-11 flex-shrink-1 items-start self-end">
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}