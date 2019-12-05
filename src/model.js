import { createStore, createEvent } from 'effector'

const user = {
  id: '0002154',
  rules: [
    {
      name: '',
      permissions: []
    }
  ]
}

const signIn = createEvent('user is login')
const signOut = createEvent('user is exist')

const $user = createStore(null)
  .on(signIn, state => ({ ...state, ...user }))
  .on(signOut, _ => null)

$user.watch(state => console.log('user: ', state))

export { $user, signIn, signOut }
