const Header = () => {
  return (
    <header className='fixed top-0 w-full h-14 bg-header-dark select-none'>
      <div className='flex h-full items-center'>
        <img
          src='./Logos-02.png'
          alt='app logo'
          className='h-full pointer-events-none'
        />
        <p className="font-bold">Name My Pet</p>
      </div>
    </header>
  )
}

export default Header
