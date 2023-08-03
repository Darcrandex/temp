/**
 * @name Home
 * @description
 * @author darcrand
 */

import { Outlet } from 'react-router-dom'
import Menu from '../components/Menu'
import { MenuProps, MenuStrategy } from '../components/Menu/types'

const menus: MenuProps['items'] = [
  {
    id: '/a',
    title: 'A',
    children: [
      { id: '/a/a-1', title: 'a-1' },
      { id: '/a/a-2', title: 'a-2' },
      {
        id: '/a/a-3',
        title: 'a-3',
        children: [
          { id: '/a/a-3-1', title: 'a-3-1' },
          { id: '/a/a-3-2', title: 'a-3-2' },
          { id: '/a/a-3-3', title: 'a-3-3' },
        ],
      },
    ],
  },
  { id: '/b', title: 'B' },
  { id: '/c', title: 'C' },
]

export default function Home() {
  return (
    <>
      <section className='flex h-screen'>
        <aside className='flex flex-col shrink-0 w-60 bg-gradient-to-b from-[#001D79] via-[#0B5BCA] to-[#53CEC7]'>
          <header className='py-4 text-center text-xl font-bold text-white border-b border-[#0050B3]'>
            亲搭业务配置平台
          </header>
          <Menu
            className='flex-1 overflow-auto'
            items={menus}
            strategy={MenuStrategy.Router}
            indent={24}
            onItemClick={(v) => console.log('item', v)}
          />
          <footer className='flex items-center p-4 text-white'>
            <span>张三</span>
          </footer>
        </aside>

        <main className='flex-1'>
          <Outlet />
        </main>
      </section>
    </>
  )
}
