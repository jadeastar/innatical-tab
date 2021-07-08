import Time from '../components/Time'
import PinnedSites from '../components/PinnedSites'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import WeatherWidget from '../components/WeatherWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Settings from '../util/settings'
import BlankWidget from '../components/BlankWidget'
import StockWidget from '../components/StockWidget'
import PinnedSitesEditable from '../components/PinnedSitesEditable'
import Friends from '../components/Friends'

interface Widget {
  type: 'stock' | 'news' | 'custom' | 'weather' | 'friend'
  props?: any
}

enum Status {
  ONLINE,
  OFFLINE,
  IDLE,
  DND
}

const defaultWidgets: Widget[] = [
  {
    type: 'stock',
    props: {
      symbols: ['GME', 'APPL', 'RBLX', 'TSLA']
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
    type: 'friend',
    props: {
      friends: [
        {
          name: 'Lleyton',
          status: Status.ONLINE
        },
        {
          name: 'Owen',
          status: Status.DND
        },
        {
          name: 'Paxton',
          status: Status.IDLE
        },
        {
          name: 'Joel',
          status: Status.ONLINE
        },
        {
          name: 'Wyeth',
          status: Status.OFFLINE
        }
      ]
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

  const { backgroundImage, pinnedSites, setBackgroundImage, setPinnedSites } =
    Settings.useContainer()
  const [open, setOpen] = useState(false)

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
      <div className='flex flex-wrap px-12 pt-12 gap-5 justify-center'>
        {widgets?.map((widget) => {
          switch (widget.type) {
            case 'stock':
              return <StockWidget {...widget.props} />
            case 'weather':
              return <WeatherWidget {...widget.props} />
            case 'friend':
              return <Friends {...widget.props} />
            default:
              return <BlankWidget />
          }
        })}
      </div>
      {open && (
        <div className='fixed bottom-0 top-0 right-0 w-96 shadow bg-offwhite dark:bg-secondary dark:text-white p-5 flex flex-col'>
          <h1 className='font-bold text-2xl'>Settings</h1>
          <div className='flex flex-col mb-5'>
            <label className='pt-4'>Bookmark Settings</label>
            <PinnedSitesEditable urls={pinnedSites} />
          </div>
          <div className='flex flex-col mb-5'>
            <label>Background Image</label>
            <input
              className='rounded p-2 w-full dark:bg-gray-800'
              type='text'
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
            ></input>
          </div>
          <div className={'flex flex-col mb-5'}>
            <label>Pinned Sites</label>
            <textarea
              className='rounded p-2 w-full dark:bg-gray-800'
              value={pinnedSites.join('\n')}
              onChange={(e) => setPinnedSites(e.target.value.split('\n'))}
            ></textarea>
          </div>
        </div>
      )}
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='fixed bottom-0 right-0 mb-5 mr-5 dark:text-white'
      >
        <FontAwesomeIcon icon={faCog} size='3x' fixedWidth />
      </button>
    </div>
  )
}

export default Home
