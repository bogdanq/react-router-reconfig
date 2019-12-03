import React from 'react'
import { Route } from 'react-router-dom'

const checkRouteGuards = (guards = [], context) => {
  return guards.every(item => item(context))
}

const hasRouteChildren = route => {
  return Array.isArray(route.children)
}

const renderRouteFallback = props => {
  return (
    <Route
      {...props}
      component={
        typeof props.fallback === 'function'
          ? props.fallback
          : () => props.fallback
      }
      key={props.path}
    />
  )
}

export { checkRouteGuards, hasRouteChildren, renderRouteFallback }
