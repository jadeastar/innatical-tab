import Time from '../components/Time'
import PinnedSites from '../components/PinnedSites'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Settings from '../util/settings'
import PinnedSitesEditable from '../components/PinnedSitesEditable'
import FastAverageColor, {
  IFastAverageColorResult,
  IFastAverageColorRgba
} from 'fast-average-color'
import { Helmet } from 'react-helmet'

const Home = () => {
  const { backgroundImage, pinnedSites, setBackgroundImage } =
    Settings.useContainer()
  const [open, setOpen] = useState(false)

  const [theme, setTheme] = useState<string>()
  useEffect(() => {
    if (backgroundImage == '') {
      return setTheme('000000')
    }
    const fac = new FastAverageColor()
    fac.getColorAsync(backgroundImage).then((color) => {
      setTheme(color.hex)
    })
  }, [backgroundImage])

  return (
    <div className='h-full'>
      <Helmet>
        <meta name='theme-color' content={theme} />
      </Helmet>
      <div
        className={`h-full  w-full fixed top-0 left-0 bg-no-repeat bg-cover bg-center`}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      ></div>
      <div className='relative flex flex-col justify-center items-center w-full h-full'>
        <Time />
        <input
          className={`mt-8 p-7 h-10 rounded-xl w-7/12 xl:w-5/12 shadow left-0 right-0 mx-auto dark:bg-secondary dark:text-white ${styles.searchBar}`}
          placeholder='Search DuckDuckGo'
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              window.location.href = `https://duckduckgo.com/?q=${encodeURI(
                e.currentTarget.value
              )}`
            }
          }}
        ></input>

        <div className='mx-auto max-w-3xl pt-8'>
          <PinnedSites urls={pinnedSites} />
        </div>
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
        </div>
      )}
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-10 h-10 fixed bottom-0 right-0 mb-5 mr-5 p-2 rounded-lg dark:text-white bg-off-white dark:bg-secondary'
      >
        <FontAwesomeIcon icon={faCog} className='text-lg' />
      </button>
    </div>
  )
}

export default Home
