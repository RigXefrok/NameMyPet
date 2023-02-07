import { forwardRef, useImperativeHandle, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import {
  INITIAL_SUGGESTIONS,
  SUGGESTIONS_LIMITS,
  SUGGESTION_TYPES,
} from '../../constants/Suggestions'
import Card from '../Card'
import SuggestionLabel from './Label'
import { motion as m } from 'framer-motion'

const tooltipVariants = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
}

const SuggestionsContainer = forwardRef(({}, ref) => {
  const [characteristics, setCharacteristics] = useState(
    INITIAL_SUGGESTIONS.filter(
      ({ type }) => type === SUGGESTION_TYPES.characteristic
    )
  )

  const [references, setReferences] = useState(
    INITIAL_SUGGESTIONS.filter(
      ({ type }) => type === SUGGESTION_TYPES.reference
    )
  )

  const [similar, setSimilar] = useState(
    INITIAL_SUGGESTIONS.filter(({ type }) => type === SUGGESTION_TYPES.similar)
  )

  const removeSuggestion = ({ value, type }) => {
    switch (type) {
      case 'characteristic':
        const newCharacteristics = characteristics.filter(
          (suggestion) => suggestion.value !== value
        )
        setCharacteristics(newCharacteristics)
        break
      case 'similar':
        const newSimilar = similar.filter(
          (suggestion) => suggestion.value !== value
        )
        setSimilar(newSimilar)
        break
      case 'reference':
        const newReferences = references.filter(
          (suggestion) => suggestion.value !== value
        )
        setReferences(newReferences)
        break

      default:
        break
    }
  }

  const addSuggestion = (newSuggestion) => {
    switch (newSuggestion.type) {
      case SUGGESTION_TYPES.characteristic:
        if (characteristics.length >= SUGGESTIONS_LIMITS.characteristic) return
        if (characteristics.some(({ value }) => value === newSuggestion.value))
          return
        setCharacteristics((current) => [...current, newSuggestion])
        break
      case SUGGESTION_TYPES.similar:
        if (similar.length >= SUGGESTIONS_LIMITS.similar) return
        if (similar.some(({ value }) => value === newSuggestion.value)) return
        setSimilar((current) => [...current, newSuggestion])
        break
      case SUGGESTION_TYPES.reference:
        if (references.length >= SUGGESTIONS_LIMITS.reference) return
        if (references.some(({ value }) => value === newSuggestion.value))
          return
        setReferences((current) => [...current, newSuggestion])
        break

      default:
        break
    }
  }

  const getSuggestions = () => {
    return { characteristics, similar, references }
  }

  useImperativeHandle(ref, () => {
    return {
      addSuggestion: (suggestion) => addSuggestion(suggestion),
      getSuggestions: getSuggestions(),
    }
  })

  return (
    <div className='flex flex-col gap-4 h-full'>
      {/* characteristics */}
      <Card>
        <div className='min-h-[72px] flex flex-col p-2 relative'>
          <div className='absolute top-0 right-0'>
            {characteristics.length} de {SUGGESTIONS_LIMITS.characteristic}
          </div>
          <div className='flex gap-2 items-center'>
            <h4 className='font-medium select-none'>Características</h4>
            <m.div
              initial={'rest'}
              animate={'rest'}
              whileHover='hover'
              className='relative'
            >
              <m.div
                variants={tooltipVariants}
                className='absolute -right-4 w-80 -top-2 translate-x-full  flex justify-center bg-neutral-800 p-1 rounded-lg border-2 border-header-dark select-none pointer-events-none
                before:absolute before:w-0 before:h-0 before:bg-inherit before:border-inherit before:border-t-4 before:border-t-transparent before:border-r-8 before:border-b-4 before:border-b-transparent before:top-2.5 before:-left-2.5'
              >
                <p>Características distintivas de tu mascota</p>
              </m.div>
              <BsQuestionCircle />
            </m.div>
          </div>
          <ul className='w-full flex flex-wrap gap-2'>
            {characteristics.map(({ value, type }) => (
              <li
                key={value + type.type}
                onClick={() => removeSuggestion({ value, type: type.type })}
                className='relative cursor-pointer h-fit'
              >
                <SuggestionLabel value={value} {...type} />
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* references */}
      <div className='flex gap-6'>
        <div className='w-1/2'>
          <Card>
            <div className='min-h-[72px] flex flex-col p-2 relative'>
              <div className='absolute top-0 right-0'>
                {references.length} de {SUGGESTIONS_LIMITS.reference}
              </div>
              <div className='flex gap-2 items-center'>
                <h4 className='font-medium select-none'>Referencias</h4>
                <m.div
                  initial={'rest'}
                  animate={'rest'}
                  whileHover='hover'
                  className='relative'
                >
                  <m.div
                    variants={tooltipVariants}
                    className='absolute -right-4 w-80 flex justify-center -top-2 translate-x-full bg-neutral-800 p-1 rounded-lg border-2 border-header-dark select-none pointer-events-none
                before:absolute before:w-0 before:h-0 before:bg-inherit before:border-inherit before:border-t-4 before:border-t-transparent before:border-r-8 before:border-b-4 before:border-b-transparent before:top-2.5 before:-left-2.5'
                  >
                    <p>Alguna referencia sobre series, películas, etc...</p>
                  </m.div>
                  <BsQuestionCircle />
                </m.div>
              </div>
              <ul className='w-full flex flex-wrap gap-2'>
                {references.map(({ value, type }) => (
                  <li
                    key={value + type.type}
                    onClick={() => removeSuggestion({ value, type: type.type })}
                    className='relative cursor-pointer h-fit'
                  >
                    <SuggestionLabel value={value} {...type} />
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        <div className='w-1/2'>
          <Card>
            <div className='min-h-[72px] flex flex-col p-2 relative'>
              <div className='absolute top-0 right-0'>
                {similar.length} de {SUGGESTIONS_LIMITS.similar}
              </div>
              <div className='flex gap-2 items-center'>
                <h4 className='font-medium select-none'>Similitudes</h4>
                <m.div
                  initial={'rest'}
                  animate={'rest'}
                  whileHover='hover'
                  className='relative'
                >
                  <m.div
                    variants={tooltipVariants}
                    className='absolute -right-4 w-80 -top-2 translate-x-full bg-neutral-800 p-1 rounded-lg border-2 border-header-dark select-none pointer-events-none
                before:absolute before:w-0 before:h-0 before:bg-inherit before:border-inherit before:border-t-4 before:border-t-transparent before:border-r-8 before:border-b-4 before:border-b-transparent before:top-2.5 before:-left-2.5'
                  >
                    <p>Algo a lo que quieras que se parezca el nombre</p>
                  </m.div>
                  <BsQuestionCircle />
                </m.div>
              </div>
              <ul className='w-full flex flex-wrap gap-2'>
                {similar.map(({ value, type }) => (
                  <li
                    key={value + type.type}
                    onClick={() => removeSuggestion({ value, type: type.type })}
                    className='relative cursor-pointer h-fit'
                  >
                    <SuggestionLabel value={value} {...type} />
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Similar */}
    </div>
  )
})
export default SuggestionsContainer
