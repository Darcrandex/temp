import { omit } from 'ramda'
import React, { PropsWithChildren, createContext, useContext } from 'react'
import { MenuProps } from './types'

type ContextValue = Pick<MenuProps, 'strategy' | 'indent' | 'onItemClick'> & {
  openIds?: string[]
  activeId?: string
  setOpenIds?: React.Dispatch<React.SetStateAction<string[]>>
  setActiveId?: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const MenuContext = createContext<ContextValue>({})

export function MenuProvider(props: PropsWithChildren<ContextValue>) {
  const value = omit(['children'], props)

  return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
}

export function useMenuContext() {
  return useContext(MenuContext)
}
