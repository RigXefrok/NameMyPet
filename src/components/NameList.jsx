import { MdContentCopy, MdRefresh } from 'react-icons/md'
import { BiRefresh } from 'react-icons/bi'
import { motion as m } from 'framer-motion'
import { useState } from 'react'

const copyVariants = {
  rest: {
    opacity: 0,
    left: -25,
  },
  tapped: {
    opacity: 1,
    left: -85,
  },
}

const NameList = ({ results, refreshResults }) => {
  const [isClicked, setIsClicked] = useState(false)
  if (results.length === 0) return

  const copyIntoClipBoard = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(results.join('\n'))
    setTimeout(() => {
      setIsClicked(false)
    }, 2000)
  }

  return (
    <div>
      <h3 className='text-lg font-semibold select-none'>
        Estos son los nombres para tu mascota:
      </h3>
      <div className='absolute right-2 top-2 flex gap-3 select-none'>
        <div
          onClick={copyIntoClipBoard}
          className='hover:bg-header-dark p-2 flex items-center justify-center rounded-full cursor-pointer transition-colors relative'
        >
          <m.div
            initial={'rest'}
            animate={isClicked ? 'tapped' : 'rest'}
            variants={copyVariants}
            className='absolute top-1 px-2 bg-header-dark rounded-lg p-1 cursor-default pointer-events-none'
          >
            Copiado!
          </m.div>
          <MdContentCopy size={20} />
        </div>
        <div
          onClick={refreshResults}
          className='hover:bg-header-dark p-2 flex items-center justify-center rounded-full cursor-pointer transition-colors'
        >
          <BiRefresh size={24} />
        </div>
      </div>
      <ul className='pl-2 min-h-36'>
        {results?.slice(0, 9).map((result) => (
          <li
            key={result}
            className='capitalize p-1 border-l-2 border-header-dark even:border-header-light'
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NameList
