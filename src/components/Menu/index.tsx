/**
 * @name Menu
 * @description
 * @author darcrand
 */

import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
import { MenuProvider } from './context'
import { MenuProps, MenuStrategy } from './types'
import { checkRepeatingId, flatAndWithPath, useOnReady } from './utils'

export default function Menu(props: MenuProps) {
  const { items, ...contextValue } = props
  const [openIds, setOpenIds] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string>()
  const value = useMemo(
    () => ({ ...contextValue, openIds, activeId, setOpenIds, setActiveId }),
    [activeId, contextValue, openIds]
  )

  const location = useLocation()

  useOnReady(() => {
    if (props.strategy === MenuStrategy.Router) {
      if (checkRepeatingId(props.items)) {
        console.warn('路由模式下，菜单的 id 必须全局唯一')
      }

      const activeId = location.pathname
      setActiveId(activeId)

      const arr = flatAndWithPath(props.items)
      const ids = arr.find((v) => v.id === activeId)?.parentIds || []
      setOpenIds(ids)
    }
  }, Boolean(location.pathname))

  return (
    <>
      <MenuProvider {...value}>
        <section className={clsx(props.className)}>
          {items.map((v) =>
            Array.isArray(v.children) ? (
              <SubMenu key={v.id} level={0} {...v} />
            ) : (
              <MenuItem key={v.id} level={0} {...v} />
            )
          )}
        </section>
      </MenuProvider>
    </>
  )
}
