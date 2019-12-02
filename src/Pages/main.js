import React from 'react'
import { Back } from '..'
import { Link } from 'react-router-dom'
import { WithAccount, Access } from '../organisms'
import { onlyAdmin } from '../rules'

export function HomePage() {
  return (
    <div className="home">
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
