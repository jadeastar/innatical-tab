import { createContainer } from '@innatical/innstate'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    const item = localStorage.getItem(key)

    if (item) {
      setValue(JSON.parse(item))
    }
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

const useSettings = () => {
  const [backgroundImage, setBackgroundImage] = useLocalStorage(
    'background',
    'https://file.coffee/u/y970mT9Cg5NkPg.png'
  )

  const [pinnedSites, setPinnedSites] = useLocalStorage('pinned', [
    'https://octii.chat',
    'https://duckduckgo.com',
    'https://twitter.com',
    'https://reddit.com',
    'https://youtube.com',
    `https://nytimes.com`
  ])

  return {
    backgroundImage,
    setBackgroundImage,
    pinnedSites,
    setPinnedSites
  }
}

export default createContainer(useSettings)
