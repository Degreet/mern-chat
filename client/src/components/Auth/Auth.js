import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Auth.scss'

export default function Auth() {
  const [name, setName] = useState(localStorage.name)
  const history = useHistory()

  const goToRoom = useCallback(() => {
    if (!name) return
    return history.push('/chat')
  }, [name, history])

  const nameHandler = useCallback((e) => {
    setName(e.target.value)
  }, [setName])

  const confirmHandler = useCallback((e) => {
    e.preventDefault()
    if (!name) return

    localStorage.name = name
    goToRoom()
  }, [name, goToRoom])

  return (
    <main className="name-form">
      <h1 className="name-form__title">Вход</h1>
      <form className="name-form__form" onSubmit={confirmHandler}>
        <input
          type="text"
          className="name-form__input inp"
          placeholder="Введите Ваше имя"
          value={name}
          onChange={nameHandler}
        />
        <button className="name-form__button btn">Далее</button>
      </form>
    </main>
  )
}
