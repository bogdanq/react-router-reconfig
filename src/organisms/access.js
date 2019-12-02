import React from 'react'
import { useUser } from '../'
import { checkGuards } from '../lib/route-reconfig'

export const Access = ({ children, permissions, guards }) => {
  const { user } = useUser()

  const hasCompletedGuards = React.useCallback(
    () => checkGuards(guards, { session: { user } }),
    [guards, user]
  )

  const hasCompletedPermissions = React.useCallback(() => {
    const inputPermissions = permissions.map(item => {
      const permissionsList = (user ? user.rules : []).reduce((acc, rule) => {
        return acc.concat(rule.permissions)
      }, [])

      return permissionsList.includes(item)
    })

    return inputPermissions.every(item => item)
  }, [permissions, user])

  if (guards) {
    return hasCompletedGuards() ? children : null
  }

  if (permissions) {
    return hasCompletedPermissions() ? children : null
  }

  return null
}
