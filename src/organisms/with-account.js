import { useUser } from '../'

export const WithAccount = ({ renderExists, renderEmpty, render }) => {
  const { user } = useUser()

  if (user && renderExists) {
    return renderExists({ account: user, accountId: user.id })
  }

  if (!user && renderEmpty) {
    return renderEmpty({ account: null, accountId: null })
  }

  return render
    ? render({ account: user, accountId: user ? user.id : null })
    : null
}
