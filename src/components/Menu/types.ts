import { CSSProperties } from 'react'

export enum MenuStrategy {
  Router = 'router',
}

export type MenuType = {
  id: string
  title: React.ReactNode
  icon?: React.ReactNode
  children?: MenuType[]
}

export type MenuItemProps = MenuType & {
  level: number
}

export type MenuProps = {
  items: Array<MenuType>
  strategy?: MenuStrategy
  indent?: number
  onItemClick?: (item: MenuItemProps) => void
  className?: string
  style?: CSSProperties
}
