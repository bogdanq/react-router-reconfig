import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Switch } from 'react-router-dom'
import { routes } from './route-config'
import { createRoutes } from './lib'
import { useStore } from 'effector-react'
import { $user } from './model'
import { Transition } from './organisms/transition'
import { MainTemplate } from './template/main'
import { createGlobalStyle, css } from 'styled-components'
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
      <MainTemplate>
        <Styles />
        <Transition>
          <Switch>{Routes}</Switch>
        </Transition>
      </MainTemplate>
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

const Styles = createGlobalStyle(css`
  :root {
    --main-bg-color: red;
  }
`)

const rootElement = document.getElementById('root')
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)
