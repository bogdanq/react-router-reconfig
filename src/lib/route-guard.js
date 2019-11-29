import React, { createContext, useContext, useState } from 'react'

export const GuardContext = createContext({
  context: {}
})

function applyArgsToGuard(guard, args) {
  return context => guard({ ...context, ...args })
}

const traverseGuards = (guards, context) =>
  guards.every(guard => guard(context))

function Guard({ children, guards = [] }) {
  const { context } = useContext(GuardContext)

  if (traverseGuards(guards, context)) {
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        someProps: 'test'
      })
    )
  }

  return null
}

function GuardsProvider({ children, context }) {
  const [user, setUser] = useState()

  return (
    <GuardContext.Provider value={{ context, user, setUser }}>
      {children}
    </GuardContext.Provider>
  )
}

export { applyArgsToGuard, Guard, GuardsProvider }
