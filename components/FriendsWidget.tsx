const Friend = (props: { username: string; status: string }) => {
  return (
    <div className='flex mb-3'>
      <div className='row-span-3 w-14'>
        <img
          className='rounded-2xl'
          src='https://octii-cdn.nyc3.digitaloceanspaces.com/assets/default.webp'
        />
      </div>
      <div className='ml-2 my-auto'>
        <div className='col-span-2 text-xl font-bold'>{props.username}</div>
        <div className='row-span-2 col-span-2 ml-2'>{props.status}</div>
      </div>
    </div>
  )
}

const FriendsWidget = () => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg rounded-3xl bg-white'>
      <div className='px-6 py-4'>
        <div className='font-bold text-2xl mb-2'>Your Friends</div>
        <Friend username='Owen Rummage' status='Working on Octii Tab' />
        <Friend username='Lleyton Gray' status='Working on Octii Tab' />
        <Friend username='Joel Innatical' status='Working on Octii Tab' />
        <Friend username='Ethan Mitchell' status='Working on Octii Tab' />
        <Friend username='Null Elf' status='Working on Octii Tab' />
      </div>
    </div>
  )
}

export default FriendsWidget
