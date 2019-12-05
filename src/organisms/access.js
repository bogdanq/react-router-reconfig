import React from 'react'
import { checkRouteGuards } from '../lib/helpers'
import { useStore } from 'effector-react'
import { $user } from '../model'

export const Access = ({ children, permissions, guards }) => {
  const user = useStore($user)

  const hasCompletedGuards = React.useCallback(
    () => checkRouteGuards(guards, { user }),
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
