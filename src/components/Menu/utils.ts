import { useEffect, useState } from 'react'
import { MenuType } from './types'

// 满足条件执行一次
export function useOnReady<T>(callback: T, isReady: boolean | (() => boolean)) {
  const [done, set] = useState(false)

  useEffect(() => {
    if (done) return

    if ((typeof isReady === 'boolean' && isReady) || (typeof isReady === 'function' && isReady())) {
      if (typeof callback === 'function') {
        callback()
        set(true)
      }
    }
  }, [callback, isReady, done])
}

// 扁平化菜单项，并追加父辈 id 链
export function flatAndWithPath(items: MenuType[]) {
  const resArr: { id: string; parentIds: string[] }[] = []

  const run = (arr: MenuType[], parentIds: string[] = []) => {
    arr.forEach((v) => {
      const { children, id } = v
      resArr.push({ id, parentIds })
      if (children) {
        run(children, parentIds.concat(id))
      }
    })
  }

  run(items)

  return resArr
}

// 检查菜单项的 id 是否全局唯一
export function checkRepeatingId(items: MenuType[]) {
  let isRepeating = false
  const ids: string[] = []

  const run = (arr: MenuType[]) => {
    for (let i = 0; i < arr.length; i++) {
      if (ids.some((v) => v === arr[i].id)) {
        isRepeating = true
        break
      } else {
        ids.push(arr[i].id)
        if (Array.isArray(arr[i].children)) run(arr[i].children || [])
      }
    }
  }

  run(items)

  return isRepeating
}

// 不同层级的菜单项的透明背景色
export function getBgByLevel(level: number) {
  return `rgba(0,0,0, ${Math.min(level * 0.2, 1)})`
}
