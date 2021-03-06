import ReactImageFallback from 'react-image-fallback'

export const PinnedSites = ({ urls }: { urls: string[] }) => {
  return (
    <div className='flex justify-center'>
      {urls.map((url) => {
        const parsed = new URL(url)
        return (
          <a
            href={url}
            className='bg-white dark:bg-secondary rounded-xl mx-3 p-3 shadow w-14 h-14'
          >
            <ReactImageFallback
              className='w-8 h-8 rounded-xl max-w-none'
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
        )
      })}
    </div>
  )
}

export default PinnedSites
