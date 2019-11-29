import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Switch } from 'react-router-dom'
import { GuardsProvider, GuardContext } from './lib/route-guard'
import './styles.css'
import { userTestPermission } from './rules'
import { routes } from './route-config'
import { createRoutes } from './lib/route-reconfig'

function App() {
  const { context } = React.useContext(GuardContext)
  const Routes = React.useMemo(
    () => createRoutes({ config: routes(context), context }),
    [context]
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
ReactDOM.render(
  <GuardsProvider context={{ user: userTestPermission }}>
    <App />
  </GuardsProvider>,
  rootElement
)
