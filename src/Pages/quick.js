import React from 'react'
import { WithAccount } from '../organisms/with-account'

export const QuickReport = () => {
  const [state] = React.useState(() => [
    'Views',
    'Clicks',
    'Links',
    'Bets',
    'New depositors',
    'Number of deposits',
    'Bonus amount',
    'CPA'
  ])
  return (
    <>
      <WithAccount
        renderExists={({ account }) => (
          <>
            <h1>Быстрый отчет</h1>
            <p>Доступна только [авторизованные]</p>
            <p>Запрет для [Administrator]</p>
            <h2>Все все варианты колонок таблицы</h2>
            <p>{JSON.stringify(state)}</p>
            <hr />
            <h2>Колонки, которые нужно скрыть</h2>
            <p>{JSON.stringify(account.rules.permissions.quick.table)}</p>
            <hr />
            <h2>Отфильтрованные колонки (видны юзеру)</h2>
            <p>
              {JSON.stringify(
                state.filter(
                  item => !account.rules.permissions.quick.table.includes(item)
                )
              )}
            </p>
          </>
        )}
      />
    </>
  )
}

export const QuickReportFallback = () => (
  <>
    <h1>страница "Быстрый отчет" не доступна</h1>
    <p>Можно редиректить, можно показать, что нет прав</p>
    <p> Можно указать, кому закрыть или разрешить:</p>
    <p>guards: [onlyAuth, besideOwner([onlyAdmin])]</p>
  </>
)
