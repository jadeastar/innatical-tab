import { useEffect } from 'react'
import { useQuery } from 'react-query'

const WeatherWidget = (props: { city: string; units: string }) => {
  const { data: weather } = useQuery(['weather', props.city], async () => {
    try {
      const res = await (
        await fetch(`https://wttr.in/${props.city}?format=j1`)
      ).json()
      return res
    } catch {
      return 'Failed to load weather'
    }
  })

  const { data: emoji } = useQuery(['emoji', props.city], async () => {
    try {
      return await (
        await fetch(`https://wttr.in/${props.city}?format=%c`)
      ).text()
    } catch {
      return 'Failed to load weather'
    }
  })

  const date = new Date()
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  return (
    <div
      className='shadow bg-white dark:bg-gray-800 dark:text-white'
      style={{ borderRadius: 32, width: 448, height: 412 }}
    >
      <div className='flex ml-4 mt-4'>
        <h1 className='text-9xl'>{emoji}</h1>
        <div className='my-auto ml-4'>
          <h1 className='text-5xl'>
            {weather?.current_condition?.[0].weatherDesc[0].value}
          </h1>
          <h1 className='text-2xl'>
            {props.units == 'imperial'
              ? weather?.current_condition?.[0].temp_F + '°F'
              : weather?.current_condition?.[0].temp_C + '°C'}
          </h1>
        </div>
      </div>
      <div className='flex ml-4 mt-4'>
        <h1 className='text-4xl'>Tomorrow</h1>
        <h1 className='text-4xl my-auto ml-4'>
          {props.units == 'imperial'
            ? weather?.weather?.[1].avgtempF + '°F'
            : weather?.weather?.[1].avgtempC + '°C'}
        </h1>
      </div>
      <div className='flex ml-4 mt-4'>
        <h1 className='text-4xl'>{days[date.getDay() + 1]}</h1>
        <h1 className='text-4xl my-auto ml-4'>
          {props.units == 'imperial'
            ? weather?.weather?.[2].avgtempF + '°F'
            : weather?.weather?.[2].avgtempC + '°C'}
        </h1>
      </div>
    </div>
  )
}

export default WeatherWidget
