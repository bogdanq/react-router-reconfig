const userTestPermission = {
  id: '0002154',
  rules: [
    {
      name: 'Administrator',
      permissions: []
    },
    {
      name: 'Vip',
      permissions: []
    }
  ]
}

export type Context = {
  user?: {
    id: string
    rules: Array<{ rules: [string]; name: string }>
  }
}

export type Roles = (arg: Context) => boolean

//rules name [string!]! =>  Administrator | Manager | Vip

// function applyArgsToGuard(guard, args) {
//   return context => guard({ ...context, ...args });
// }

//rules name [string!]! =>  Administrator | Manager | Vip
// function applyArgsToGuard(guard, args) {
//   return context => guard({ ...context, ...args });
// }

function onlyAuth(context: Context) {
  return Boolean(context.user)
}

function onlyManager(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Manager')
  }
}

function onlyAdmin(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Administrator')
  }
}

function onlyVip(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Vip')
  }
}

function onlyRoles(roles: Array<Roles>) {
  return (context: Context) => {
    const user = context.user
    if (user) {
      return roles.some(role => role(context))
    }
  }
}

function besideOwner(roles: Array<Roles>) {
  return (context: Context) => {
    return roles.every(role => !role(context))
  }
}

export {
  onlyAuth,
  onlyManager,
  onlyAdmin,
  onlyVip,
  onlyRoles,
  besideOwner,
  userTestPermission
}
