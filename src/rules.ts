// function applyArgsToGuard(guard, args) {
//   return context => guard({ ...context, ...args });
// }

export type Context = {
  user?: {
    id: string
    rules: {
      role: string
    }
  }
}
export type Roles = (arg: Context) => boolean

// Partner | AdAgent | Manager | Administrator
function onlyAuth(context: Context) {
  return Boolean(context.user)
}

function onlyManager(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.role === 'Manager'
  }
}
function onlyPartner(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.role === 'Partner'
  }
}

function onlyAdmin(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.role === 'Administrator'
  }
}

function onlyAdAgent(context: Context) {
  const user = context.user
  if (user) {
    return user.rules.role === 'AdAgent'
  }
}

function onlyRoles(roles: Array<Roles>) {
  return context => {
    return roles.some(role => role(context))
  }
}

function besideOwner(roles: Array<Roles>) {
  return context => {
    return roles.every(role => !role(context))
  }
}

export {
  onlyAuth,
  onlyManager,
  onlyAdmin,
  onlyRoles,
  besideOwner,
  onlyAdAgent,
  onlyPartner
}
