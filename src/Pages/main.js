import React from 'react'
import { Back } from '..'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="home">
      <h1>Home page</h1>
      <Back />
      <ul>
        <li>
          <Link to="/cabinet">user cabinet (auth rule)</Link>
        </li>
        <li>
          <Link to="/posts">Posts (all rule)</Link>
        </li>
        <li>
          <Link to="/admin">Admin panel (admin rule)</Link>
        </li>
      </ul>
    </div>
  )
}
