import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import FriendsWidget from './components/FriendsWidget'
import { NewsWidget, QuoteCard } from './components/NewsWidget'
import StockWidget from './components/StockWidget'
import Time from './components/Time'

export default function Home() {
  return (
    <div className='p-10'>
      <Time />
      <div className='flex gap-4'>
        <div className='w-96 max-w-96'>
          <FriendsWidget />
          <br></br>
          <StockWidget />
        </div>
        <div
          className='col-span-2 mx-auto hidden xl:block overflow-y-auto'
          style={{ height: '38rem' }}
        >
          <NewsWidget />
        </div>
      </div>
      {/* <FriendsWidget /> */}
    </div>
  )
}
