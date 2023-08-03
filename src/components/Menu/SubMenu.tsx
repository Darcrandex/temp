/**
 * @name SubMenu
 * @description
 * @author darcrand
 */

import { useCallback } from 'react'
import MenuItem from './MenuItem'
import { useMenuContext } from './context'
import { MenuItemProps } from './types'
import { getBgByLevel } from './utils'

import './menu.css'

export default function SubMenu(props: MenuItemProps) {
  const context = useMenuContext()
  const level = props.level || 0

  const open = context.openIds?.includes(props.id)
  const toggleOpen = useCallback(() => {
    context.setOpenIds?.((ids) => (open ? ids.filter((v) => v !== props.id) : ids.concat(props.id)))
  }, [context, open, props.id])

  return (
    <>
      <section
        className='cursor-pointer select-none transition-all hover:!bg-[#53CEC7]/25 active:!bg-[#53CEC7]/50'
        style={{ paddingLeft: level * (context.indent || 0), backgroundColor: getBgByLevel(props.level) }}
        onClick={toggleOpen}
      >
        <div className='flex p-4 items-center justify-between'>
          <span className='text-lg text-white'>{props.title}</span>

          <i className={open ? 'menu_sub-menu_arrow sub-menu--open' : 'menu_sub-menu_arrow'}></i>
        </div>
      </section>

      {open
        ? props.children!.map((v) =>
            Array.isArray(v.children) ? (
              <SubMenu key={v.id} level={props.level + 1} {...v} />
            ) : (
              <MenuItem key={v.id} level={props.level + 1} {...v} />
            )
          )
        : null}
    </>
  )
}
