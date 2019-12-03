import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  checkRouteGuards,
  renderRouteFallback,
  hasRouteChildren
} from './helpers'
import { MemoParentProps, CreateRoutesProps } from './typings'

export function createRoutes<Context>({
  config,
  rootPath = '',
  context,
  userProps
}: CreateRoutesProps<Context>): Array<React.ReactNode> {
  return Array.isArray(config)
    ? config.reduce<Array<React.ReactNode>>((acc, route, index) => {
        const path = rootPath + route.path

        const RootMemoRoute = React.memo(
          getParentRoute<Context>(),
          (prev, next) => prev.props.match.path === next.props.match.path
        )

        const newRoute = (
          <Route
            key={index}
            exact={route.exact}
            path={path}
            component={(props: {
              match: {
                path: string
              }
            }) => {
              if (Array.isArray(route.children)) {
                return (
                  <RootMemoRoute
                    route={route}
                    context={context}
                    path={path}
                    props={props}
                  />
                )
              }

              return route.component({ ...props, userProps })
            }}
          />
        )

        if (
          Array.isArray(route.guards) &&
          !checkRouteGuards<Context>(route.guards, context)
        ) {
          if (route.fallback) {
            return acc.concat(renderRouteFallback<Context>(route))
          }
          return acc
        }

        if (hasRouteChildren<Context>(route)) {
          return acc.concat(newRoute)
        }

        return acc.concat(
          newRoute,
          createRoutes({
            config: route.children,
            context
          })
        )
      }, [])
    : []
}

function getParentRoute<Context>() {
  return ({ props, route, context, path }: MemoParentProps<Context>) => {
    return (
      <route.component
        {...props}
        context={context}
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
  }
}
