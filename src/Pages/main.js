import React from 'react'
import { Back } from '..'
import { Link } from 'react-router-dom'
import { WithAccount, Access } from '../organisms'
import { onlyAdmin } from '../rules'
import { signIn, signOut } from '../model'

export function HomePage({ changeUser }) {
  return (
    <div className="home">
      <WithAccount
        renderExists={({ accountId }) => (
          <Loggined changeUser={changeUser} accountId={accountId} />
        )}
        renderEmpty={() => <Offline changeUser={changeUser} />}
      />

      <h1>Home page</h1>
      <Back />
      <Navigation />
    </div>
  )
}

const Navigation = () => (
  <>
    <Link to="/posts">Posts (all rule)</Link>
    <WithAccount renderExists={LinksForAuth} />
  </>
)

const LinksForAuth = () => (
  <>
    <Link to="/cabinet">user cabinet (auth rule)</Link>
    <Access guards={[onlyAdmin]}>
      <Link to="/admin">Admin panel (admin rule)</Link>
    </Access>
  </>
)

const Loggined = ({ accountId }) => {
  return (
    <div>
      <h3>loggined id: {accountId}</h3>
      <button onClick={signOut}>Exit</button>
    </div>
  )
}

const Offline = () => {
  return (
    <div>
      <h3>offline</h3>
      <button onClick={signIn}>Login</button>
    </div>
  )
}
