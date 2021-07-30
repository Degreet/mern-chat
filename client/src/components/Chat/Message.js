export default function Message(props) {
  const { msg } = props

  return (
    <li className="chat__message">
      <span className="chat__message-author">{msg.author}</span>
      <span className="chat__message-text">{msg.text}</span>
    </li>
  )
}