import React from 'react'
import { RouteObject } from 'react-router-dom'
import { withSuspense } from './utils'

const Counter = withSuspense(React.lazy(() => import('@/pages/Counter')))

// 子模块路由的集合
export const counterRoutes: RouteObject[] = [{ path: '/counter', element: <Counter /> }]
