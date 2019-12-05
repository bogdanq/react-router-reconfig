import React from 'react'
import { Route } from 'react-router-dom'
import { RouteType, RouteProps } from './typings'

function checkRouteGuards<Context>(
  guards: Array<(context: Context) => boolean>,
  context: Context
) {
  return guards.every(item => item(context))
}

function hasRouteChildren<Context>(route: RouteProps<Context>) {
  return Array.isArray(route.children)
}

function renderRouteFallback<Context>(props: RouteType<Context>) {
  return <Route {...props} component={props.fallback} key={props.path} />
}

export { checkRouteGuards, hasRouteChildren, renderRouteFallback }
