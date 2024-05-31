import {useEffect} from 'react'

const useResize = (callback: (e: UIEvent) => void) => {
  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      callback(e)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [callback])
}

export default useResize
