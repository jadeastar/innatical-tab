import React, { useEffect, useState } from 'react'

export function QuoteCard(props: {
  image: string
  title: string
  content: string
}) {
  return (
    <div className='max-w-5xl bg-white p-5 rounded-3xl tracking-wide shadow-lg'>
      <div id='header' className='flex'>
        <img
          alt='mountain'
          className='w-45 rounded-md border-2 border-gray-300'
          src={props.image}
        />
        <div id='body' className='flex flex-col ml-5'>
          <h4 id='name' className='text-xl font-semibold mb-2'>
            {props.title}
          </h4>
          <p id='job' className='text-gray-800 mt-2'>
            {props.content}
          </p>
        </div>
      </div>
    </div>
  )
}
export function NewsWidget() {
  const [stories, setStories] = useState<object[] | null>()
  useEffect(() => {
    ;(async () => {
      const data = await (await fetch('/api/news')).json()

      setStories(data.results)
    })()
  }, [])
  return (
    <>
      <div className='pb-6'>
        {stories
          ?.filter(
            (story: any) => story.multimedia && story.title && story.abstract
          )
          .map((story: any) => (
            <div className='pb-3'>
              <a href={story.short_url}>
                <QuoteCard
                  image={story.multimedia?.[2]?.url}
                  title={story.title}
                  content={story.abstract}
                />
              </a>
            </div>
          ))}
      </div>
    </>
  )
}
