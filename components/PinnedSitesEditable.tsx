import ReactImageFallback from 'react-image-fallback'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Settings from '../util/settings'

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const PinnedSites = ({ urls }: { urls: string[] }) => {
  const { pinnedSites, setPinnedSites } = Settings.useContainer()

  return (
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
                      href={url}
                      className={`bg-white rounded-xl shadow dark:bg-primary mx-1 p-2`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default PinnedSites
