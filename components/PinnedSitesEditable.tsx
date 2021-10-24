import ReactImageFallback from 'react-image-fallback'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Settings from '../util/settings'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const PinnedSites = ({ urls }: { urls: string[] }) => {
  const { pinnedSites, setPinnedSites } = Settings.useContainer()
  const [isOpen, setIsOpen] = useState(false)
  const [website, setWebsite] = useState('')

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={() => setIsOpen(false)}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-offwhite dark:bg-secondary dark:text-white shadow-xl rounded-2xl'>
                <Dialog.Title as='h3' className='text-lg font-medium leading-6'>
                  Add Website
                </Dialog.Title>
                <div className='mt-2'>
                  <input
                    className='rounded p-2 w-full dark:bg-gray-800'
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        try {
                          new URL(website)
                          if (pinnedSites.includes(website))
                            throw new Error('Already Included')
                          setIsOpen(false)
                          setPinnedSites([...pinnedSites, website])
                          setWebsite('')
                        } catch {}
                      }
                    }}
                  ></input>
                </div>

                <div className='mt-4 flex gap-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-red-500 text-white'
                    onClick={() => {
                      setIsOpen(false)
                      setWebsite('')
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-inndigo text-white'
                    onClick={() => {
                      try {
                        new URL(website)
                        if (pinnedSites.includes(website))
                          throw new Error('Already Included')
                        setIsOpen(false)
                        setPinnedSites([...pinnedSites, website])
                        setWebsite('')
                      } catch {}
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return
          }

          const items = reorder(
            pinnedSites,
            result.source.index,
            result.destination.index
          )

          setPinnedSites(items)
        }}
      >
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided) => (
            <div
              className='flex overflow-x-auto'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {urls.map((url, index) => {
                const parsed = new URL(url)
                return (
                  <Draggable key={url} draggableId={url} index={index}>
                    {(provided) => (
                      <a
                        className={`bg-white rounded-xl shadow dark:bg-primary mx-1 p-2 relative`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className='right-0 bottom-7 absolute cursor-pointer'
                          onClick={() =>
                            setPinnedSites(
                              pinnedSites.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                        <ReactImageFallback
                          className='w-8 rounded-xl max-w-none'
                          src={
                            parsed.host === 'octii.chat'
                              ? 'https://cdn.octii.chat/assets/default.webp'
                              : `https://octii-cdn.nyc3.digitaloceanspaces.com/tab/icons/${parsed.host}.png`
                          }
                          fallbackImage={[
                            `${parsed.origin}/favicon.svg`,
                            `${parsed.origin}/touch-icon-iphone-retina.png`,
                            `${parsed.origin}/touch-icon-ipad-retina.png`,
                            `${parsed.origin}/touch-icon-ipad.png`,
                            `${parsed.origin}/touch-icon-iphone.png`,
                            `${parsed.origin}/apple-touch-icon.png`,
                            `https://favicons.githubusercontent.com/${parsed.host}`,
                            `${parsed.origin}/favicon.png`,
                            `${parsed.origin}/favicon.ico`
                          ]}
                        />
                      </a>
                    )}
                  </Draggable>
                )
              })}
              <a
                className='bg-white rounded-xl shadow dark:bg-primary mx-1 p-2 flex cursor-pointer'
                onClick={() => setIsOpen(true)}
              >
                <FontAwesomeIcon className={'!w-8 my-auto'} icon={faPlus} />
              </a>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default PinnedSites
