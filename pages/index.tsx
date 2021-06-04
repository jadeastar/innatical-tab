import Time from '../components/Time'
import PinnedSites from '../components/PinnedSites'
import StockWidget from '../components/StockWidget'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import NewsWidget from '../components/NewsWidget'
import CustomWidget from '../components/CustomWidget'

interface Widget {
  type: 'stock' | 'news' | 'custom'
  props?: any
}

const Home = () => {
  const [widgets, setWidgets] = useState<Widget[] | null>()
  useEffect(() => {
    const item = localStorage.getItem('widgets')
    if (item) {
      setWidgets(JSON.parse(item))
    } else {
      localStorage.setItem(
        'widgets',
        JSON.stringify([
          {
            type: 'stock',
            props: {
              symbol: 'TSLA'
            }
          },
          {
            type: 'stock',
            props: {
              symbol: 'GME'
            }
          },
          {
            type: 'custom',
            props: {
              src: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
            }
          }
        ])
      )
      setWidgets([
        {
          type: 'stock',
          props: {
            symbol: 'TSLA'
          }
        },
        {
          type: 'stock',
          props: {
            symbol: 'GME'
          }
        },
        {
          type: 'custom',
          props: {
            src: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
          }
        }
      ])
    }
  }, [])

  return (
    <div>
      <div className={`${styles.banner} p-12 relative bg-no-repeat bg-cover`}>
        <Time />
        <input
          className={`p-7 absolute h-10 rounded-3xl w-7/12 xl:w-5/12 shadow left-0 right-0 mx-auto dark:bg-gray-800 dark:text-white ${styles.searchBar}`}
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
        <PinnedSites
          urls={[
            'https://octii.chat',
            'https://duckduckgo.com',
            'https://twitter.com',
            'https://reddit.com',
            'https://news.ycombinator.com',
            'https://youtube.com',
            `https://nytimes.com`
          ]}
        />
      </div>
      <div className='flex flex-wrap p-12 gap-5 justify-center'>
        {widgets?.map((widget) => {
          switch (widget.type) {
            case 'stock':
              return <StockWidget {...widget.props} />
            case 'news':
              return <NewsWidget />
            case 'custom':
              return <CustomWidget {...widget.props} />
          }
        })}
      </div>
    </div>
  )
}

export default Home
