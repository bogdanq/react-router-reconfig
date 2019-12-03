import React from 'react'
import { Route } from 'react-router-dom'
import { RoutePropsFoo, Context, Roles, RouteProps } from './typings'

const checkRouteGuards = (guards: Array<Roles>, context: Context) => {
  return guards.every(item => item(context))
}

const hasRouteChildren = (route: RouteProps) => {
  return Array.isArray(route.children)
}

const renderRouteFallback = (props: RoutePropsFoo): React.ReactNode => {
  return <Route {...props} component={props.fallback} key={props.path} />
}

export { checkRouteGuards, hasRouteChildren, renderRouteFallback }
