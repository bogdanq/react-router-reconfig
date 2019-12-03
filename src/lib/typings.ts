import React from 'react'

export type MemoParentProps<Context> = {
  route: {
    children: Array<RoutePropsFoo<Context>>
    component: React.ComponentType<any>
  }
  path: string
  context: Context
  props: {
    match: {
      path: string
    }
  }
}

export type RoutePropsFoo<Context> = {
  path: string
  exact: boolean
  children: Array<RoutePropsFoo<Context>>
  component: (arg: any) => any
  fallback?: React.ComponentType
  guards?: Array<(context: Context) => boolean>
}

export interface CreateRoutesProps<Context> {
  config: Array<RoutePropsFoo<Context>>
  rootPath?: string
  context: Context
  userProps?: object
}

export type FallbackHelper = {
  fallback: React.ComponentType
  path: string
}

export type RouteProps<Context> = { children: Array<RoutePropsFoo<Context>> }
