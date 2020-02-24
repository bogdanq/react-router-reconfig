import React from 'react'
import { checkRouteGuards } from '../lib'
import { useStore } from 'effector-react'
import { $user } from '../model'

export const Access = ({
  children,
  permissions,
  guards,
  renderEmpty = () => null
}) => {
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
    return hasCompletedGuards() ? children : renderEmpty()
  }

  if (permissions) {
    return hasCompletedPermissions() ? children : renderEmpty()
  }

  return null
}
