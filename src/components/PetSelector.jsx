import { forwardRef, useImperativeHandle, useState } from 'react'
import { PetSpecies } from '../constants/PetSpecies'
import {
  BsArrowDownShort,
  BsArrowUpShort,
  BsGenderFemale,
  BsGenderMale,
} from 'react-icons/bs'

const PetSelector = forwardRef(({}, ref) => {
  const [petSelected, setPetSelected] = useState({
    name: 'rabbit',
    gender: 'female',
  })

  const [isOpen, setIsOpen] = useState(false)

  const updateSelection = (newPet) => {
    setPetSelected(({ name, ...data }) => ({ ...data, name: newPet }))
    setIsOpen(false)
  }

  const toggleSelections = () => {
    setIsOpen((current) => !current)
  }
  const openSelections = () => {
    if (isOpen) return
    setIsOpen(true)
  }

  const toggleGender = () => {
    const newGender = petSelected.gender === 'male' ? 'female' : 'male'
    setPetSelected(({ gender, ...data }) => ({ ...data, gender: newGender }))
  }

  useImperativeHandle(ref, () => {
    return {
      getPet: petSelected,
    }
  })

  return (
    <div className='flex flex-col relative h-[70px]'>
      <h3 className='text-lg font-semibold select-none'>¿Qué es tú mascota?</h3>
      <div className='flex h-full items-center py-1 gap-2'>
        <div
          onClick={openSelections}
          className={`basis-full h-full px-4 bg-section-dark flex items-center rounded-lg capitalize ${
            !isOpen && 'cursor-help'
          }`}
        >
          {petSelected.name}
        </div>
        <div
          onClick={toggleGender}
          className='cursor-pointer w-12 select-none bg-header-light hover:bg-header-dark h-full items-center rounded-lg transition-colors flex justify-center'
        >
          {petSelected.gender === 'male' ? (
            <BsGenderMale size={20} />
          ) : (
            <BsGenderFemale size={20} />
          )}
        </div>
        <div
          onClick={toggleSelections}
          className='cursor-pointer w-12 select-none bg-header-light hover:bg-header-dark h-full items-center rounded-lg transition-colors flex justify-center'
        >
          {isOpen ? (
            <BsArrowUpShort size={24} />
          ) : (
            <BsArrowDownShort size={24} />
          )}
        </div>
      </div>

      {/* options */}
      <div className='absolute w-full -bottom-2 -left-2.5'>
        {isOpen && (
          <ul className='absolute border-2 bg-neutral-800 border-header-dark rounded-lg p-2 flex gap-2 overflow-x-hidden select-none'>
            {PetSpecies.map((specie) => (
              <li
                key={specie.name}
                onClick={() => updateSelection(specie.name)}
                className='cursor-pointer w-[49.5px] h-[49.5px] shrink-0 border-2 border-header-dark bg-header-light hover:bg-header-dark rounded-lg flex items-center justify-center'
              >
                <img src={specie.icon} className='' />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
})

export default PetSelector
