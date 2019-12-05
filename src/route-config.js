import React from 'react'
import { HomePage } from './Pages/main'
import { Cabinet, VipUser, UserInfo } from './Pages/user'
import { onlyAuth, onlyVip, onlyRoles, onlyAdmin, onlyManager } from './rules'
import { PostList, Posts, PostCreate, PostUpdate } from './Pages/posts'
import { Admin } from './Pages/admin'
import { Back } from '.'
import { Redirect } from 'react-router-dom'

export const routes = () => [
  {
    component: HomePage,
    exact: true,
    path: '/'
  },
  {
    component: Cabinet,
    path: '/cabinet',
    guards: [onlyAuth],
    fallback: () => <Redirect to="/" />,
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
    /** Можно обработать редирект на конкретной странице, либо передать 404 - уникальную для всех страниц */
    fallback: () => <Redirect to="/" />,
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
