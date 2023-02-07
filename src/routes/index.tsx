import React from 'react'
import { RouteObject } from 'react-router-dom'
import { counterRoutes } from './counter-routes'
import { withSuspense } from './utils'

const Home = withSuspense(React.lazy(() => import('@/pages/Home')))

export const routes: RouteObject[] = [{ path: '/', element: <Home /> }, ...counterRoutes]
