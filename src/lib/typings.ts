export type MemoParentProps = {
  route: {
    children: any
    component: any
  }
  path: string
  context: Context
  props: {
    match: {
      path: string
    }
  }
}

// rules.ts
export type Context = {
  user?: {
    id: string
    rules: Array<{ rules: [string]; name: string }>
  }
}

export type RoutePropsFoo = {
  path: string
  exact: boolean
  children: any
  component: any
  fallback: React.ComponentType
  guards?: Array<Roles>
}

export type CreateRoutesProps = {
  config: Array<RoutePropsFoo>
  rootPath?: string
  context: Context
  userProps?: object
}

// rules.ts
export type Roles = (arg: Context) => boolean

export type FallbackHelper = {
  fallback: React.ComponentType
  path: string
}

export type RouteProps = { children: React.ReactChildren }
