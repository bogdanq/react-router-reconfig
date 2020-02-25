import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  checkRouteGuards,
  renderRouteFallback,
  hasRouteChildren
} from './helpers'
import { MemoParent, CreateRoutes } from './typings'

export function createRoutes<Context>({
  config,
  rootPath = '',
  context,
  userProps
}: CreateRoutes<Context>): Array<React.ReactNode> {
  return Array.isArray(config)
    ? config.reduce<Array<React.ReactNode>>((acc, route, index) => {
        const path = rootPath + route.path

        const newRoute = (
          <Route
            key={index}
            exact={route.exact === false ? route.exact : true}
            path={path}
            component={(props: {
              match: {
                path: string
              }
            }) => {
              // если указаны дочерние компоненты - отрисовать
              if (Array.isArray(route.children)) {
                return (
                  <RenderChildren
                    route={route}
                    context={context}
                    path={path}
                    props={props}
                  />
                )
              }

              // если дочерних компонентов нет - вернуть переданнй компонент
              // передав props - компоненты, а так же userProps - кастомный пропсы
              if (typeof route.component === 'function') {
                return route.component({ ...props, ...userProps })
              }

              return <route.component {...props} {...userProps} />
            }}
          />
        )

        // Если есть guards - пробежать по всем и проверить
        if (
          Array.isArray(route.guards) &&
          !checkRouteGuards<Context>(route.guards, context)
        ) {
          if (route.fallback) {
            // Если есть fallback - создать Route, передать пропсы в него, вместо компонента
            // Положить в аккумулятор новый коммпонент
            return acc.concat(
              renderRouteFallback<Context>({
                ...route,
                exact: route.exact === false ? route.exact : true,
                children: []
              })
            )
          }

          return acc
        }

        if (hasRouteChildren<Context>(route)) {
          return acc.concat(newRoute)
        }

        return acc
          .concat(
            newRoute,
            createRoutes({
              config: route.children,
              context
            })
          )
          .filter(Boolean)
      }, [])
    : []
}

const RenderChildren = React.memo(
  ({ props, route, context, path }: MemoParent<any>) => {
    return (
      <route.component
        {...props}
        renderNestedRoute={(userProps: object) => (
          <Switch>
            {createRoutes({
              config: route.children,
              rootPath: path,
              context,
              userProps
            })}
          </Switch>
        )}
      />
    )
  },
  (prev, next) => prev.props.match.path === next.props.match.path
)
