import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

const Time = () => {
  const [, setTick] = useState<object>()
  useEffect(() => {
    const interval = setInterval(() => {
      setTick({})
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { data: forecast } = useQuery(['weather'], async () => {
    try {
      const res = await (await fetch(`https://wttr.in/?format=%c%20%C`)).text()
      return res
    } catch {
      return 'Failed to load weather'
    }
  })

  return (
    <div className='text-white rounded-lg text-center mt-5'>
      <h1 className='text-5xl font-bold'>{new Date().toLocaleTimeString()}</h1>
      <h2 className='text-xl'>
        {new Date().toLocaleDateString([], {
          month: 'long',
          day: '2-digit'
        })}
        {' - '}
        {forecast}
      </h2>
    </div>
  )
}

export default Time
