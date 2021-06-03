import { useState, useEffect } from 'react'
import { useGeolocation } from 'react-use'

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

  const state = useGeolocation()
  const [forecast, setForecast] = useState('Loading...')

  useEffect(() => {
    if (!state.longitude || !state.latitude) return
    ;(async () => {
      try {
        const res = await (
          await fetch(
            `https://api.weather.gov/points/${state.latitude},${state.longitude}`
          )
        ).json()
        const forecastResult = await (
          await fetch(res.properties.forecast)
        ).json()
        setForecast(forecastResult.properties.periods[0].shortForecast)
      } catch {
        setForecast('Failed to load weather')
      }
    })()
  }, [state.latitude, state.longitude])

  return (
    <div className='text-white rounded-lg mb-5'>
      <h1 className='text-4xl font-bold'>{new Date().toLocaleTimeString()}</h1>
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
