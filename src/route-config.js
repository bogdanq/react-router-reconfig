import React from 'react'
import { HomePage } from './Pages/main'
import { Cabinet, VipUser, UserInfo } from './Pages/user'
import { onlyAuth, onlyVip, onlyRoles, onlyAdmin, onlyManager } from './rules'
import { PostList, Posts, PostCreate, PostUpdate } from './Pages/posts'
import { Admin } from './Pages/admin'
import { Back } from '.'

export const routes = () => [
  {
    component: HomePage,
    exact: true,
    path: '/'
  },
  {
    component: Cabinet,
    exact: false,
    path: '/cabinet',
    guards: [onlyAuth],
    children: [
      {
        component: VipUser,
        exact: true,
        path: '/promo',
        guards: [onlyVip]
      },
      {
        component: UserInfo,
        exact: true,
        path: '/info'
      },
      {
        component: () => <h1>you has not permission (vip)</h1>,
        path: '/*'
      }
    ]
  },
  {
    component: PostList,
    exact: false,
    path: '/posts',
    children: [
      {
        component: Posts,
        exact: true,
        path: '/'
      },
      {
        component: PostCreate,
        exact: true,
        path: '/create',
        guards: [onlyAuth]
      },
      {
        component: PostUpdate,
        exact: true,
        path: '/update/:id',
        guards: [onlyAuth, onlyRoles([onlyAdmin, onlyManager])]
      },
      {
        component: () => <h1>you has not permission (manager/admin)</h1>,
        path: '/*'
      }
    ]
  },
  {
    component: Admin,
    exact: true,
    path: '/admin',
    guards: [onlyAuth, onlyAdmin]
  },
  {
    component: () => (
      <>
        <Back />
        <h1>you has not permission (admin)</h1>
      </>
    ),
    path: '/*'
  }
]
