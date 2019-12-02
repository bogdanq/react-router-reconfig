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

//rules name [string!]! =>  Administrator | Manager | Vip

// function applyArgsToGuard(guard, args) {
//   return context => guard({ ...context, ...args });
// }

//rules name [string!]! =>  Administrator | Manager | Vip
// function applyArgsToGuard(guard, args) {
//   return context => guard({ ...context, ...args });
// }

function onlyAuth(context) {
  return Boolean(context.session.user)
}

function onlyManager(context) {
  const user = context.session.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Manager')
  }
}

function onlyAdmin(context) {
  const user = context.session.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Administrator')
  }
}

function onlyVip(context) {
  const user = context.session.user
  if (user) {
    return user.rules.some(rule => rule.name === 'Vip')
  }
}

function onlyRoles(roles) {
  return context => {
    return roles.some(role => role(context))
  }
}

function besideOwner(roles) {
  return context => {
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
