import { useEffect } from 'react'

const useClickOutside = (refs, callback, eventType = 'mousedown') => {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target
      const isOutside = Array.isArray(refs)
        ? refs
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : refs.current && !refs.current.contains(target)

      if (isOutside) {
        callback?.()
      }
    }

    document.body.addEventListener(eventType, handleClick)

    return () => {
      document.body.removeEventListener(eventType, handleClick)
    }
  }, [eventType, callback, refs])
}

export default useClickOutside
