import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Switch } from 'react-router-dom'
import { routes } from './route-config'
import { createRoutes } from './lib/route-reconfig'
import { useStore } from 'effector-react'
import { $user } from './model'
import './styles.css'

function App() {
  const user = useStore($user)

  const Routes = React.useMemo(
    () =>
      createRoutes({
        config: routes(),
        context: { user }
      }),
    [user]
  )

  return (
    <>
      <BrowserRouter>
        <Switch>{Routes}</Switch>
      </BrowserRouter>
    </>
  )
}

export function Back() {
  return (
    <ul>
      <li>
        <Link to="/">Go to main page</Link>
        <hr />
      </li>
    </ul>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
