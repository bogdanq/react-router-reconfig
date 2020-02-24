import React from 'react'
import { signOut } from '../model'

export const SignOut = () => {
  return (
    <>
      <h1>SignOut</h1>
      <h1>Выйти</h1>
      <button onClick={signOut}>Выход</button>
    </>
  )
}

export const SignOutFallback = () => (
  <>
    <h1>Страница "Выход" не доступна</h1>
    <p>Можно редиректить, можно показать, что нет прав</p>
    <p>Доступ только для </p>
    <p>guards: [onlyAuth]</p>
  </>
)
