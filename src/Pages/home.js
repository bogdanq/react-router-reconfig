import React from 'react'

export const Home = () => {
  return (
    <>
      <h1>Главная страница</h1>
      <p>Доступна всем пользователям, кроме [авторизованные]</p>
    </>
  )
}

export const HomeFallback = () => (
  <>
    <h1>Главная страница не доступна</h1>
    <p>Можно редиректить, можно показать, что нет прав</p>
    <p> Можно указать, кому закрыть или разрешить:</p>
    <p>guards: [besideOwner([onlyAuth])]</p>
  </>
)
