import { createStore, createEvent } from 'effector'

// Partner | AdAgent | Manager | Administrator
const user = {
  id: '0002154',
  rules: {
    role: 'Partner',
    permissions: {
      full: {
        table: ['Views', 'ID', 'Clicks']
      },
      quick: {
        table: ['Views', 'Clicks', 'Links', 'Bets']
      },
      players: {
        table: ['Country', 'Bets', 'CPA']
      }
    }
  }
}

const signIn = createEvent('user is login')
const signOut = createEvent('user is exist')
const changeRole = createEvent('change role')

const $user = createStore(user)
  .on(signIn, state => ({ ...state, ...user }))
  .on(signOut, _ => null)
  .on(changeRole, (state, role) => ({
    ...state,
    rules: { ...state.rules, role }
  }))

$user.watch(() => console.log(state => state))

export { $user, signIn, signOut, changeRole }
