/**
 * @name MenuItem
 * @description
 * @author darcrand
 */

import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useMenuContext } from './context'
import { MenuItemProps, MenuStrategy } from './types'
import { getBgByLevel } from './utils'

export default function MenuItem(props: MenuItemProps) {
  const navigate = useNavigate()
  const context = useMenuContext()
  const level = props.level || 0
  const isRouterStrategy = context.strategy === MenuStrategy.Router
  const isActive = context.activeId === props.id

  const onClick = () => {
    context.setActiveId?.(props.id)

    if (isRouterStrategy) {
      console.log('isRouterStrategy')
      navigate(props.id)
    } else {
      context.onItemClick?.(props)
    }
  }

  return (
    <>
      <section
        className={clsx(
          'select-none cursor-pointer transition-all',
          isActive ? '!bg-[#53CEC7]' : 'hover:!bg-[#53CEC7]/25 active:!bg-[#53CEC7]/50'
        )}
        style={{ paddingLeft: level * (context.indent || 0), backgroundColor: getBgByLevel(props.level) }}
        onClick={onClick}
      >
        <div className='p-4 relative overflow-hidden'>
          <span className='text-lg text-white'>{props.title}</span>

          <i
            className={clsx(
              'absolute right-0 top-1/2 w-3 h-3 bg-white rotate-45 translate-x-1/2 -translate-y-1/2 transition-all',
              isActive ? 'opacity-100' : 'opacity-0'
            )}
          ></i>
        </div>
      </section>
    </>
  )
}
