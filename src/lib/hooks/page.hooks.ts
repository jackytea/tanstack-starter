import { Dispatch, SetStateAction, useEffect } from 'react'

const useResetLoadingOnPageRestore = (
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handlePageRestore = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        return
      }

      setIsLoading(false)
    }

    window.addEventListener('pageshow', handlePageRestore)

    return () => window.removeEventListener('pageshow', handlePageRestore)
  }, [setIsLoading])
}

export { useResetLoadingOnPageRestore }
