import React from 'react'
import { WithAccount } from '../organisms/with-account'

export const FullReport = props => {
  const [state] = React.useState(() => [
    'ID',
    'Site',
    'Views',
    'Clicks',
    'CTR',
    'RS',
    'CPA'
  ])
  return (
    <WithAccount
      renderExists={({ account }) => (
        <>
          <h1>Полный отчет страница</h1>
          <p>Доступна только [авторизованные]</p>
          <p>Запрет для [Partner]</p>
          <h2>Все все варианты колонок таблицы</h2>
          <p>{JSON.stringify(state)}</p>
          <hr />
          <h2>Колонки, которые нужно скрыть</h2>
          <p>{JSON.stringify(account.rules.permissions.full.table)}</p>
          <hr />
          <h2>Отфильтрованные колонки (видны юзеру)</h2>
          <p>
            {JSON.stringify(
              state.filter(
                item => !account.rules.permissions.full.table.includes(item)
              )
            )}
          </p>
        </>
      )}
    />
  )
}

export const FullReportFallback = () => (
  <WithAccount
    render={({ account }) => (
      <>
        <h1>страница "Полный отчет" не доступна</h1>
        <h2>Роль юзера</h2>
        <p>{JSON.stringify(account)}</p>
        <p>Можно редиректить, можно показать, что нет прав</p>
        <p> Можно указать, кому закрыть или разрешить:</p>
        <p>guards: [onlyAuth, besideOwner([onlyPartner])]]</p>
      </>
    )}
  />
)
