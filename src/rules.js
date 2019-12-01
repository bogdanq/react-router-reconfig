const userTestPermission = {
  id: '0002154',
  rules: [
    {
      name: '',
      permissions: []
    }
  ]
}

//rules name [string!]! =>  Administrator | Manager | Vip
// function applyArgsToGuard(guard, args) {
//   return context => guard({ ...context, ...args });
// }

function onlyAuth(context) {
  return Boolean(context.session)
}

function onlyManager(context) {
  return context.session.user.rules.some(rule => rule.name === 'Manager')
}

function onlyAdmin(context) {
  return context.session.user.rules.some(rule => rule.name === 'Administrator')
}

function onlyVip(context) {
  return context.session.user.rules.some(rule => rule.name === 'Vip')
}

function onlyRoles(roles) {
  return context => {
    return roles.some(role => role(context))
  }
}

// function besideOwner(context) {
//   const isChatOwner = context.user.id === context.peerId;
//   return !isChatOwner;
// }

export {
  onlyAuth,
  onlyManager,
  onlyAdmin,
  onlyVip,
  userTestPermission,
  onlyRoles
}
