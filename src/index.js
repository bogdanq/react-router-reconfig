import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Switch } from 'react-router-dom'
import './styles.css'
import { userTestPermission } from './rules'
import { routes } from './route-config'
import { createRoutes } from './lib/route-reconfig'

export const useUser = () => ({
  user: userTestPermission
})

function App() {
  const { user } = useUser()
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
