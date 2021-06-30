const StockWidget = (props: { symbol: string }) => {
  return (
    <iframe
      width='448'
      height='412'
      src={`https://public.com/stocks/${props.symbol}/embed`}
      className='shadow border-0 bg-white dark:bg-gray-800'
      style={{ borderRadius: 32 }}
    ></iframe>
  )
}

export default StockWidget
