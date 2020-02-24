import React from 'react'
import { WithAccount } from '../organisms/with-account'

export const PlayersReport = () => {
  const [state] = React.useState(() => [
    'ID',
    'ID site',
    'Site',
    'Subid',
    'Country',
    'Bets',
    'CPA',
    'RS'
  ])
  return (
    <WithAccount
      renderExists={({ account }) => (
        <>
          <h1>Отчет по игрокам</h1>
          <p>Доступна только [авторизованные]</p>
          <p>Запрет для [Manager]</p>
          <h2>Все все варианты колонок таблицы</h2>
          <p>{JSON.stringify(state)}</p>
          <hr />
          <h2>Колонки, которые нужно скрыть</h2>
          <p>{JSON.stringify(account.rules.permissions.players.table)}</p>
          <hr />
          <h2>Отфильтрованные колонки (видны юзеру)</h2>
          <p>
            {JSON.stringify(
              state.filter(
                item => !account.rules.permissions.players.table.includes(item)
              )
            )}
          </p>
        </>
      )}
    />
  )
}

export const PlayersReportFallback = () => (
  <>
    <WithAccount
      render={({ account }) => (
        <>
          <h1>страница "Отчет по игрокам" не доступна</h1>
          <p>Можно редиректить, можно показать, что нет прав</p>
          <p> Можно указать, кому закрыть или разрешить:</p>
          <h2>Роль юзера</h2>
          <p>{JSON.stringify(account)}</p>
          <p>Можно редиректить, можно показать, что нет прав</p>
          <p> Можно указать, кому закрыть или разрешить:</p>
          <p>guards: [onlyAuth, besideOwner([onlyManager])]</p>
        </>
      )}
    />
  </>
)
