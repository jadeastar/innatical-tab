import React, { useEffect, useState } from 'react'
import styles from '../../styles/NewsWidget.module.scss'
import { useQuery } from 'react-query'

// const QuoteCard = (props: {
//   image: string
//   title: string
//   content: string
// }) => {
//   return (
//     <div className='max-w-5xl bg-white p-5 rounded-3xl tracking-wide shadow-lg'>
//       <div id='header' className='flex'></div>
//         <img
//           alt='mountain'
//           className='w-45 rounded-md border-2 border-gray-300'
//           src={props.image}
//         />
//         <div id='body' className='flex flex-col ml-5'>
//           <h4 id='name' className='text-xl font-semibold mb-2'>
//             {props.title}
//           </h4>
//           <p id='job' className='text-gray-800 mt-2'>
//             {props.content}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
const NewsWidget = () => {
  // const { data } = useQuery(
  //   'articles',
  //   async () => await (await fetch('/api/news')).json()
  // )

  return (
    <div className={`p-6 bg-white ${styles.newsBox} shadow`}>
      <h1>Welcome Home</h1>
    </div>
  )
}

export default NewsWidget
