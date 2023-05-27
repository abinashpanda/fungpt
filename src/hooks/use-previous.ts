import { useEffect, useRef } from 'react'

export function usePrevious<T extends any>(value: T | undefined) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes
  return ref.current
}
