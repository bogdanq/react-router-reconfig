import * as React from 'react'

export type MemoParent<Context> = {
  route: RouteType<Context>
  path: string
  context: Context
  props: any
}

export type RouteType<Context> = {
  path: string
  exact?: boolean
  children?: Array<RouteType<Context>> | null
  component:
    | ((props: { userProps?: object; match: { path: string } }) => JSX.Element)
    | React.MemoExoticComponent<
        (props?: { userProps?: object; match: { path: string } }) => JSX.Element
      >
  fallback?: React.ComponentType
  guards?: Array<(context: Context) => boolean>
}

export interface CreateRoutes<Context> {
  config?: Array<RouteType<Context>> | null
  rootPath?: string
  context: Context
  userProps?: object
}

export type RouteProps<Context> = {
  children?: Array<RouteType<Context>> | null
}

export type RenderNestedRoute = (userProps?: object) => JSX.Element
export type RouteTypes<Context> = Array<RouteType<Context>>
