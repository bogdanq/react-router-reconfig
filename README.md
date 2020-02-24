# React-router-reconfig

## Installation

To install, you can use [npm](https://npmjs.org/):

    $ npm install react-router-reconfig

## Motivation

The library makes it easy to write routing in the application. Makes its structure obvious, as well as it can be divided into child configs and combined into one.
Supports [nested routes](#Usage) (renderNestedRoute) and typescript. The library has a built-in guard system.
When you click on child links, the parent will not be updated.

## Demo

https://codesandbox.io/s/guards-x9xky

## Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Link, Switch, Redirect } from 'react-router-dom'
import {
  createRoutes,
  RenderNestedRoute,
  RouteTypes
} from 'react-router-reconfig'

const useUser = () => ({
  user: {
    id: '',
    rules: []
  }
})

const FirstPage = () => {
  return <div>first page</div>
}

type Props = {
  renderNestedRoute: RenderNestedRoute
}

const SecondPage = ({ renderNestedRoute }: Props) => {
  return (
    <div>
      <h1>second page</h1>
      {renderNestedRoute({ someProps: 'someProps' })}
    </div>
  )
}

const SecondPageChild1 = () => {
  return <div>second page SecondPageChild1</div>
}

const SecondPageChild2 = () => {
  return <div>second page SecondPageChild2</div>
}

const routes = (): RouteTypes => [
  {
    component: FirstPage,
    path: '/',
    guards: [onlyAuth]
  },
  {
    component: SecondPage,
    exact: false,
    path: '/second',
    guards: [onlyAuth],
    children: [
      {
        component: SecondPageChild1,
        path: '/child-first',
        guards: [onlyAuth, onlyAdmin]
      },
      {
        component: SecondPageChild2,
        path: '/child-second',
        guards: [onlyAuth, onlyRoles([onlyAdmin, onlyManager])],
        fallback: () => <Redirect to="/" />
      },
      {
        component: () => <h1>page not found</h1>,
        path: '*'
      }
    ]
  },
  {
    component: () => <h1>page not found</h1>,
    path: '*'
  }
]

type RouteProps = {
  user: {
    id: number
  }
}

function App() {
  const { user } = useUser()
  const Routes = React.useMemo(
    () =>
      createRoutes <
      RouteProps >
      {
        config: routes(),
        context: { user }
      },
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

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

## Route-config

|    name     |          Type          |     description     | required |           links            |
| :---------: | :--------------------: | :-----------------: | :------: | :------------------------: |
| `component` |       ReactNode        | modal open function |  false   |
|   `exact`   |        boolean         | modal close request |   true   |
|   `path`    |         string         |    opened modals    |   true   |
| `children`  |       Array<{}>        |   id active modal   |  false   |
|  `guards`   | [(context) => boolean] |        false        |  false   | [example](#Example-guards) |
| `fallback`  |       ReactNode        |        false        |  false   |

## createRoutes types

|   name    |  Type  |        description        | required |          links           |
| :-------: | :----: | :-----------------------: | :------: | :----------------------: |
| `config`  | array  |       router-config       |   true   | [example](#Route-config) |
| `context` | object |           user            |   true   |
| `generic` | custom | createRoutes<you generic> |  false   |

## renderNestedRoute types

|  name   |  Type  | description | required |
| :-----: | :----: | :---------: | :------: |
| `props` | object |  you props  |  false   |

## Example-guards

```jsx
function onlyAuth(context) {
  return Boolean(context.user)
}

function onlyAdmin(context) {
  const user = context.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Administrator')
  }
}

function onlyManager(context) {
  const user = context.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Manager')
  }
}

function onlyRoles(roles) {
  return context => {
    return roles.some(role => role(context))
  }
}

//.... and other you function
```
