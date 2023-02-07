import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const stateAtom = atom({ key: 'counter', default: { count: 0 } })

export function useCounter() {
  const [state, setState] = useRecoilState(stateAtom)
  const add = useCallback(() => setState((prev) => ({ ...prev, count: prev.count + 1 })), [])
  const sub = useCallback(() => setState((prev) => ({ ...prev, count: prev.count - 1 })), [])
  return { count: state.count, add, sub }
}
