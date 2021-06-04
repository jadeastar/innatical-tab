const CustomWidget = ({ src }: { src: string }) => {
  return (
    <iframe
      className='shadow'
      style={{ borderRadius: 32 }}
      width={448}
      height={412}
      src={src}
    />
  )
}

export default CustomWidget
