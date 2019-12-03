# React-router-reconfig

## Demo

https://codesandbox.io/s/guards-x9xky

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { createRoutes } from "react-router-reconfig;

const useUser = () => ({
  user: {
      id: '',
      rules: []
  }
});

const routes = () => [
  {
    component: SomeComponent,
    exact: true,
    path: "/"
  },
  {
    component: SomeComponent,
    exact: false,
    path: "/user",
    children: [
      {
        component: SomeComponent,
        exact: true,
        path: "/cabinet",
      }
    ]
  },
  {
    component: () => <>page not found</>,
     path: "/*",
  }
]

function App() {
  const { user } = useUser();
  const Routes = React.useMemo(
    () =>
      createRoutes({
        config: routes(),
        context: { user }
      }),
    [user]
  );

  return (
    <>
      <BrowserRouter>
        <Switch>{Routes}</Switch>
      </BrowserRouter>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## Route-config

|    name     |                        Type                         |     description     | required |               links               |
| :---------: | :-------------------------------------------------: | :-----------------: | :------: | :-------------------------------: |
| `component` |                      ReactNode                      | modal open function |  false   |
|   `exact`   |                       boolean                       | modal close request |   true   |
|   `path`    |                       string                        |    opened modals    |   true   |
| `children`  |                      Array<{}>                      |   id active modal   |  false   |
|  `guards`   | Array<[(context: createRoutes context) => boolean]> |        false        |  false   | [example-guards](#Example-guards) |
| `fallback`  |                      ReactNode                      |        false        |  false   |

## createRoutes types

|   name    |  Type  |      description      | required |             links              |
| :-------: | :----: | :-------------------: | :------: | :----------------------------: |
| `config`  | array  |  modal open function  |   true   | [example-types](#Route-config) |
| `context` | object |  modal close request  |   true   |
| `generic` | custom | createRoutes<Context> |  false   |

## renderNestedRoute types

|  name   |  Type  |     description     | required |
| :-----: | :----: | :-----------------: | :------: |
| `props` | object | modal close request |  false   |

## Example-guards

```jsx
function onlyAuth(context) {
  return Boolean(context.session.user)
}

function onlyAdmin(context) {
  const user = context.session.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Administrator')
  }
}

function onlyRoles(roles) {
  return context => {
    return roles.some(role => role(context))
  }
}

//.... and other you function
```
