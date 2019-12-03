import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  checkRouteGuards,
  renderRouteFallback,
  hasRouteChildren
} from './helpers'

export const createRoutes = ({ config, rootPath = '', context, userProps }) => {
  return Array.isArray(config)
    ? config.reduce((acc, route, index) => {
        const path = rootPath + route.path

        const newRoute = (
          <Route
            key={index}
            exact={route.exact}
            path={path}
            component={props => {
              if (Array.isArray(route.children)) {
                return (
                  <MemoParent
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

        if (route.guards && !checkRouteGuards(route.guards, context)) {
          if (route.fallback) {
            return acc.concat(renderRouteFallback(route))
          }
          return acc
        }

        if (hasRouteChildren(route)) {
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

const MemoParent = React.memo(
  ({ props, route, context, path }) => {
    return (
      <route.component
        {...props}
        context={context}
        renderNestedRoute={userProps => (
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
