import Time from '../components/Time'
import PinnedSites from '../components/PinnedSites'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import WeatherWidget from '../components/WeatherWidget'
import WidgetBase from '../components/WidgetBase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Settings from '../util/settings'
import BlankWidget from '../components/BlankWidget'
import StockWidget from '../components/StockWidget'
interface Widget {
  type: 'stock' | 'news' | 'custom' | 'weather'
  props?: any
}

const defaultWidgets: Widget[] = [
  {
    type: 'stock',
    props: {
      symbols: [
        'GME',
        'APPL',
        'RBLX',
        'TSLA'

      ]
    }
  },
  {
    type: 'custom',
    props: {
      src: 'https://ytprivate.com/embed/dQw4w9WgXcQ'
    }
  },
  {
    type: 'weather',
    props: {
      city: '',
      units: ''
    }
  },
  {
    type: 'weather',
    props: {
      city: '',
      units: ''
    }
  }
]

const Home = () => {
  const [widgets, setWidgets] = useState<Widget[] | null>()
  useEffect(() => {
    const item = localStorage.getItem('widgets')
    if (item) {
      setWidgets(JSON.parse(item))
    } else {
      localStorage.setItem('widgets', JSON.stringify(defaultWidgets))
      setWidgets(defaultWidgets)
    }
  }, [])

  const { backgroundImage, pinnedSites } = Settings.useContainer()

  return (
    <div>
      <div
        className={`${styles.banner} p-12 relative bg-no-repeat bg-cover bg-center`}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <Time />
        <input
          className={`p-7 absolute h-10 rounded-3xl w-7/12 xl:w-5/12 shadow left-0 right-0 mx-auto dark:bg-secondary dark:text-white ${styles.searchBar}`}
          placeholder='Search the web...'
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              window.location.href = `https://duckduckgo.com/?q=${encodeURI(
                e.currentTarget.value
              )}`
            }
          }}
        ></input>
      </div>
      <div className='mx-auto max-w-3xl pt-10'>
        <PinnedSites urls={pinnedSites} />
      </div>
      <div className='flex flex-wrap p-12 gap-5 justify-center'>
        {widgets?.map((widget) => {
          switch (widget.type) {
            case 'stock':
              return <StockWidget {...widget.props} />
            case 'weather':
              return <WeatherWidget {...widget.props} />
            default:
              return <BlankWidget />
          }
          return <BlankWidget />
        })}
      </div>
      <Link href='/settings'>
        <button type='button'>
          <FontAwesomeIcon
            className='absolute bottom-5 right-5 dark:text-white'
            icon={faCog}
            size='3x'
            fixedWidth
          />
        </button>
      </Link>
    </div>
  )
}

export default Home
