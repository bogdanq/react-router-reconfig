import React from 'react'
import { changeRole } from '../model'
import { WithAccount } from '../organisms/with-account'

export const Cabinet = props => {
  return (
    <WithAccount
      renderExists={({ account }) => (
        <>
          <>
            <h1>Кабинет</h1>
            <h2>Роль: {JSON.stringify(account.rules.role)}</h2>

            <p>Доступна всем пользователям, кроме [не авторизованные]</p>
            <button onClick={() => changeRole('Partner')}>Partner</button>
            <button onClick={() => changeRole('AdAgent')}>AdAgent</button>
            <button onClick={() => changeRole('Manager')}>Manager</button>
            <button onClick={() => changeRole('Administrator')}>
              Administrator
            </button>
          </>
          {props.renderNestedRoute()}
        </>
      )}
    />
  )
}

export const CabinetFallback = () => (
  <>
    <h1>Кабинет не доступен</h1>
    <p>Можно редиректить, можно показать, что нет прав</p>
    <p> Можно указать, кому закрыть или разрешить:</p>
    <p>guards: [besideOwner([onlyAuth])]</p>
  </>
)
