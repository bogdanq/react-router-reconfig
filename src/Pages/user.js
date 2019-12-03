import React from 'react'
import { Link } from 'react-router-dom'
import { Back } from '..'
import { WithAccount, Access } from '../organisms'
import { onlyVip } from '../rules'

export function Cabinet(props) {
  console.log('update: Cabinet')

  return (
    <div>
      <Back />
      <h1>user cabinet page userID = {props.context.user.id}</h1>
      <WithAccount render={LinkForAuth} />
      {/* required renderNestedRoute */}
      {props.renderNestedRoute({ someProps: 'test1' })}
    </div>
  )
}

const LinkForAuth = () => (
  <>
    <Link to="/cabinet/info">User Info (auth rule)</Link>
    <Access guards={[onlyVip]}>
      <Link to="/cabinet/promo">For Vip user (Vip rule)</Link>
    </Access>
  </>
)

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
