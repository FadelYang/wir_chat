import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { marked } from 'marked'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remakerBreaks from 'remark-breaks'

export default function HomePage() {
  const [inputMessage, setInputMessage] = useState('')
  const [isRequestPending, setIsRequestPending] = useState(false)
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (inputMessage) {
        sendQuestionMessage()
      }
    }

    setInputMessage(e.target.value)
    e.target.style.height = '3rem'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const sendQuestionMessage = async (e) => {


    const newInputMessage = { isUser: true, text: inputMessage }
    setConversations((previousMessage) => [...previousMessage, newInputMessage])

    const data = {
      message: inputMessage
    }

    setIsRequestPending(true)

    const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const answer = await response.json()

    setIsRequestPending(false)

    if (!sessionId && data.session_id) {
      setSessionId(data.session_id)
    }

    const rawBotMessage = answer.data.outputs[0].outputs[0].results.message.data.text.replace(/\n\n/gi, '&nbsp; \n')

    const botMessage = { isUser: false, text: rawBotMessage }
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
                  // <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  <ReactMarkdown remarkPlugins={[remarkGfm, remakerBreaks]}>{message.text}</ReactMarkdown>
                )}
              </div>
            ))}

            {
              isRequestPending && (
                <div className='bot-message'>Loading...</div>
              )
            }
          </div>

          {/* Input area */}
          <div className={`sticky bottom-0 bg-white p-3 ${!conversations ? 'my-auto' : ''}`}>
            <div className="flex justify-center gap-1">
              <textarea
                value={inputMessage}
                onChange={handleMessageInput}
                onKeyDown={handleMessageInput}
                type="text"
                placeholder="Kirim pertanyaan"
                className="w-1/2 px-5 py-2 border border-black resize-none rounded-xl h-11 max-h-36"
              />
              {
                inputMessage ? (
                  <button onClick={sendQuestionMessage} className="items-start self-end px-5 text-white bg-black rounded-xl h-11 flex-shrink-1">
                    Kirim
                  </button>
                ) : (
                  <button disabled onClick={sendQuestionMessage} className="items-start self-end px-5 text-white bg-gray-900 rounded-xl h-11 flex-shrink-1">
                    Kirim
                  </button>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}