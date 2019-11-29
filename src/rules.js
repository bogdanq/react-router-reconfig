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

function onlyAuth(context) {
  return context.user.id === userTestPermission.id
}

function onlyManager(context) {
  return context.user.rules.some(rule => rule.name === 'Manager')
}

function onlyAdmin(context) {
  return context.user.rules.some(rule => rule.name === 'Administrator')
}

function onlyVip(context) {
  return context.user.rules.some(rule => rule.name === 'Vip')
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
