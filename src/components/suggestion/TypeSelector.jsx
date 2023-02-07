import { useState } from 'react'
import { SUGGESTION_TYPES } from '../../constants/Suggestions'
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs'

const SuggestionsTypeSelector = ({ handleType }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [typeSelected, setTypeSelected] = useState(
    SUGGESTION_TYPES.characteristic
  )

  const toggleOpen = () => {
    setIsOpen((current) => !current)
  }
  const updateTypeSelected = (type) => {
    setTypeSelected(type)
    handleType(type)
    setIsOpen(false)
  }

  return (
    <div className='relative bg-section-dark rounded-lg w-fit select-none z-50'>
      <div
        className='flex cursor-pointer items-center h-full'
        onClick={toggleOpen}
      >
        <div className='p-1 w-8 h-full'>
          <div className='bg-header-light hover:bg-header-dark transition-colors rounded-tl-lg rounded-bl-lg rounded-tr-sm rounded-br-sm h-full flex items-center justify-center'>
            {isOpen ? (
              <BsArrowUpShort size={24} />
            ) : (
              <BsArrowDownShort size={24} />
            )}
          </div>
        </div>
        <div className='basis-full flex justify-center px-1 mr-1'>
          <p
            className={`w-4 h-4 shrink-0 rounded-full ${typeSelected.color}`}
          ></p>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 z-50'>
        {isOpen && (
          <ul className='absolute top-0.5 -left-2 border-2 border-header-dark bg-neutral-800 rounded-lg mt-2 p-2 flex flex-col gap-2'>
            <li
              onClick={() =>
                updateTypeSelected(SUGGESTION_TYPES.characteristic)
              }
              className='flex items-center relative gap-1 cursor-pointer hover:bg-suggestion-c/20 p-1 rounded-lg'
            >
              <div className='bg-suggestion-c w-3 aspect-square rounded-full translate-y-0.5'></div>
              <p className='z-10'>característica</p>
            </li>
            <li
              onClick={() => updateTypeSelected(SUGGESTION_TYPES.reference)}
              className='flex items-center gap-1 cursor-pointer hover:bg-suggestion-r/20 p-1 rounded-lg'
            >
              <div className='w-3 aspect-square rounded-full bg-suggestion-r translate-y-0.5'></div>
              referencia
            </li>
            <li
              onClick={() => updateTypeSelected(SUGGESTION_TYPES.similar)}
              className='flex items-center gap-1 cursor-pointer hover:bg-suggestion-s/20 p-1 rounded-lg'
            >
              <div className='w-3 aspect-square rounded-full bg-suggestion-s translate-y-0.5'></div>
              similar
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
export default SuggestionsTypeSelector
