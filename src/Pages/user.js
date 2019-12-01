import React from 'react'
import { Link } from 'react-router-dom'
import { Back } from '..'

export function Cabinet(props) {
  console.log('update: Cabinet')

  return (
    <div>
      <Back />
      <h1>user cabinet page userID = {props.context.session.user.id}</h1>
      <ul>
        <li>
          <Link to="/cabinet/info">User Info (auth rule)</Link>
        </li>
        <li>
          <Link to="/cabinet/promo">For Vip user (Vip rule)</Link>
        </li>
      </ul>

      {/* required renderNestedRoute */}
      {props.renderNestedRoute({ someProps: 'test1' })}
    </div>
  )
}

export function VipUser(props) {
  return (
    <div className="block">
      <h1>VipUser user</h1>
    </div>
  )
}

export function UserInfo(props) {
  return (
    <div className="block">
      <h1>UserInfo user</h1>
    </div>
  )
}
