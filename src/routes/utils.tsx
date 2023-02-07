import React, { Suspense } from 'react'

/**
 * @description 每个路由组件自己处理懒加载
 * @param Componet 通过 React.lazy 函数获得的懒加载组件
 */
export function withSuspense(Componet: React.LazyExoticComponent<React.FC>) {
  const LazyComponent = () => (
    <Suspense fallback='loading...'>
      <Componet />
    </Suspense>
  )

  return LazyComponent
}
