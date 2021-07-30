import './Chat.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import Message from './Message'
import { useHttp } from '../../hooks/http.hook'

const socket = io.connect()

export default function Chat() {
  const name = localStorage.name
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const { request } = useHttp()
  const messagesRef = useRef()
  const history = useHistory()

  const msgChangeHandler = useCallback((e) => {
    setMessageText(e.target.value)
  }, [setMessageText])

  const newMsgHandler = useCallback((e) => {
    e.preventDefault()
    setMessageText('')

    socket.emit('new-msg', {
      author: name,
      text: messageText,
    })
  }, [messageText, name])

  useEffect(() => {
    socket.on('new-msg', (msg) => {
      setMessages(messages.concat(msg))
    })
  }, [setMessages, messages])

  useEffect(() => {
    if (!name) return history.push('/auth')
  }, [history, name])

  useEffect(() => {
    (async () => {
      try {
        const result = await request(
          '/api/last-messages',
          'POST',
          { limit: 20 }
        )

        if (result && result.length) {
          setMessages(result)
        }
      } catch {}
    })()
  }, [request])

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  return (
    <main className="chat">
      <ul ref={messagesRef} className="chat__messages">
        {messages && messages.map((msg, idx) => <Message key={idx} msg={msg} />)}
      </ul>
      <form className="chat__new-message-form" onSubmit={newMsgHandler}>
        <input
          className="chat__new-message-text inp"
          placeholder="Введите сообщение"
          value={messageText}
          onChange={msgChangeHandler}
        />
      </form>
    </main>
  )
}
