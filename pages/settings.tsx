import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import SettingsContainer from '../util/settings'

const Settings = () => {
  const { backgroundImage, setBackgroundImage, pinnedSites, setPinnedSites } =
    SettingsContainer.useContainer()
  return (
    <div className={'mx-auto w-5/12 p-5 dark:text-white'}>
      <h1 className='text-5xl mb-5'>Settings</h1>
      <div className={'flex flex-col w-5/12 mb-5'}>
        <label>Background Image</label>
        <input
          className='rounded p-2 w-96 dark:bg-gray-800'
          type='text'
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
        ></input>
      </div>
      <div className={'flex flex-col w-5/12 mb-5'}>
        <label>Pinned Sites</label>
        <textarea
          className='rounded p-2 w-96 dark:bg-gray-800'
          value={pinnedSites.join('\n')}
          onChange={(e) => setPinnedSites(e.target.value.split('\n'))}
        ></textarea>
      </div>

      <Link href='/'>
        <button type='button'>
          <FontAwesomeIcon
            className='absolute bottom-5 right-5'
            icon={faTimes}
            size='3x'
            fixedWidth
          />
        </button>
      </Link>
    </div>
  )
}

export default Settings
