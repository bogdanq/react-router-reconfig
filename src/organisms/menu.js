import React from 'react'
import { WithAccount } from './with-account'
import { Link } from 'react-router-dom'
import { Access } from './access'
import {
  onlyAuth,
  // onlyRoles,
  onlyAdmin,
  onlyPartner,
  onlyManager,
  besideOwner
} from '../rules'

export const Menu = () => {
  return (
    <>
      <WithAccount renderEmpty={linkForGuest} renderExists={linkForUser} />
    </>
  )
}

const linkForUser = () => {
  return (
    <>
      <Link to="/sign-out">Выход</Link>
      <Link to="/cabinet">Кабинет</Link>
      <div className="routes">
        <Access
          renderEmpty={() => <p>Роут скрыт!</p>}
          guards={[onlyAuth, besideOwner([onlyPartner])]}
        >
          <p>Роут Доступен!</p>
        </Access>
        <Link to="/full">Полный отчет</Link>
      </div>

      <div className="routes">
        <Access
          renderEmpty={() => <p>Роут скрыт!</p>}
          guards={[onlyAuth, besideOwner([onlyManager])]}
        >
          <p>Роут Доступен!</p>
        </Access>
        <Link to="/players">Отчет по игрокам</Link>
      </div>

      <div className="routes">
        <Access
          renderEmpty={() => <p>Роут скрыт!</p>}
          guards={[onlyAuth, besideOwner([onlyAdmin])]}
        >
          <p>Роут Доступен!</p>
        </Access>
        <Link to="/quick">Быстрый отчет</Link>
      </div>
    </>
  )
}

const linkForGuest = () => {
  return (
    <>
      <Link to="/sign-in">Вход</Link>
      <Link to="/">Главная</Link>
    </>
  )
}
