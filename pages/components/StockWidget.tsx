import { useEffect, useState } from 'react'

const Stock = (props: { symbol: string; name: string; icon: string }) => {
  const [data, setData] = useState()
  useEffect(() => {
    ;(async () => {
      const data = await (await fetch(`/api/stocks/${props.symbol}`)).json()
      console.log(data)
    })()
  }, [props.symbol])
  return (
    <div className='flex mb-3'>
      <div className='row-span-3 w-14'>
        <img className='rounded-2xl' src={props.icon} />
      </div>
      <div className='ml-2 my-auto w-full'>
        <div className='text-xl font-bold w-full flex'>
          <span>{props.symbol}</span>
          <span className='text-green-400 ml-auto'>Up 12%</span>
        </div>
        <div>{props.name}</div>
      </div>
    </div>
  )
}

const StockWidget = () => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg rounded-3xl bg-white'>
      <div className='px-6 py-4'>
        <div className='font-bold text-2xl mb-2'>Your Stocks</div>
        <Stock
          symbol='SPOT'
          name='Spotify Media LLC'
          icon='https://th.bing.com/th/id/R674514170045868f2b86caf767c90c25?rik=HHj9OiaA6vk5dg&riu=http%3a%2f%2fwww.soft32.com%2fblog%2fwp-content%2fuploads%2f2016%2f08%2fspotify_logo.png&ehk=pWf0NLcCy0UoQLjcJWYoumQZxbqLSXxeV39lQI%2fqnPg%3d&risl=&pid=ImgRaw'
        />

        <Stock
          symbol='APPL'
          name='Apple INC'
          icon='https://th.bing.com/th/id/Ra56d13399ca5fce64c22ea391e352cc9?rik=wzJFcpdGxT3mkA&riu=http%3a%2f%2fwww.pngpix.com%2fwp-content%2fuploads%2f2016%2f07%2fPNGPIX-COM-Apple-Logo-PNG-Transparent.png.png&ehk=zoe5eIrVTvd3R1h1YzezIboBjskG7p1VNiC3kgWWgOU%3d&risl=&pid=ImgRaw'
        />

        <Stock
          symbol='TSLA'
          name='Tesla Motors INC'
          icon='https://th.bing.com/th/id/R4a723cc6ba9606c7de2666dc667c94f6?rik=3c8iKsPVIfLYJw&riu=http%3a%2f%2fpngimg.com%2fuploads%2ftesla_logo%2ftesla_logo_PNG19.png&ehk=v42J%2bn3aTLzgJo0Kgz9SBWcAdW1HniRPVfXzKUTDh3c%3d&risl=&pid=ImgRaw'
        />
      </div>
    </div>
  )
}

export default StockWidget
