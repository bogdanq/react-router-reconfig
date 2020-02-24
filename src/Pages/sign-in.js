import React from 'react'
import { signIn } from '../model'

export const SignIn = () => {
  return (
    <>
      <h1>SignIn</h1>
      <h1>Войти</h1>
      <button onClick={signIn}> Логин</button>
    </>
  )
}

export const SignInFallback = () => (
  <>
    <h1>страница "Войти" не доступна</h1>
    <p>Можно редиректить, можно показать, что нет прав</p>
    <p> Можно указать, кому закрыть или разрешить:</p>
    <p>guards: [besideOwner([onlyAuth])]</p>
  </>
)
