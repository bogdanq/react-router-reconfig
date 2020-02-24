import React from 'react'
import {
  onlyAuth,
  // onlyRoles,
  onlyAdmin,
  onlyPartner,
  onlyManager,
  besideOwner
} from './rules'
import { Back } from '.'
import { Redirect } from 'react-router-dom'
import { Home, HomeFallback } from './pages/home'
import { SignIn } from './pages/sign-in'
import { SignOut, SignOutFallback } from './pages/sign-out'
import { FullReport, FullReportFallback } from './pages/full'
import { PlayersReport, PlayersReportFallback } from './pages/players'
import { QuickReport, QuickReportFallback } from './pages/quick'
import { Cabinet } from './pages/main'

export const routes = () => [
  {
    component: Home,
    path: '/',
    guards: [besideOwner([onlyAuth])],
    fallback: HomeFallback
  },
  {
    component: SignIn,
    path: '/sign-in',
    guards: [besideOwner([onlyAuth])],
    fallback: () => <Redirect to="/cabinet" />
  },
  {
    component: SignOut,
    path: '/sign-out',
    guards: [onlyAuth],
    fallback: SignOutFallback
  },
  {
    component: FullReport,
    path: '/full',
    guards: [onlyAuth, besideOwner([onlyPartner])],
    fallback: FullReportFallback
  },
  {
    component: PlayersReport,
    path: '/players',
    guards: [onlyAuth, besideOwner([onlyManager])],
    fallback: PlayersReportFallback
  },
  {
    component: QuickReport,
    path: '/quick',
    guards: [onlyAuth, besideOwner([onlyAdmin])],
    fallback: QuickReportFallback
  },
  {
    component: Cabinet,
    exact: false,
    path: '/cabinet',
    fallback: () => <Redirect to="/" />,
    guards: [onlyAuth],
    children: [
      {
        path: '/info',
        component: () => <h1>info</h1>
      },
      {
        component: () => <h1>404 cabinet</h1>,
        path: '*'
      }
    ]
  },
  {
    component: () => (
      <>
        <Back />
        <h1>Такой страницы нет!</h1>
      </>
    ),
    path: '*'
  }
]
