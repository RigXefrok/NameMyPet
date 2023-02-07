const Card = ({ children }) => {
  return (
    <div className='relative w-full h-fit z-10'>
      <div
        className='border-2 rounded-lg border-header-dark bg-neutral-800 p-2 z-10 w-full h-full
        before:absolute before:top-2 before:-left-2 before:rounded-lg before:w-full before:h-full before:bg-neutral-700 before:-z-10'
      >
        {children}
      </div>
    </div>
  )
}

export default Card
