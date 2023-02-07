import SuggestionsTypeSelector from './suggestion/TypeSelector'
import { RiAddLine } from 'react-icons/ri'
import { useState } from 'react'
import { SUGGESTION_TYPES } from '../constants/Suggestions'

const Suggestions = ({ suggestionContainer }) => {
  const [suggestion, setSuggestion] = useState({
    value: '',
    type: SUGGESTION_TYPES.characteristic,
  })

  const updateSuggestionType = (newType) => {
    setSuggestion(({ type, ...data }) => ({ ...data, type: newType }))
  }

  const updateSuggestionValue = (newValue) => {
    setSuggestion(({ value, ...data }) => ({ ...data, value: newValue }))
  }

  const handleChange = (event) => {
    updateSuggestionValue(event.target.value)
  }

  const addSuggestion = async (event) => {
    event.preventDefault()
    if (!suggestion.value) return
    suggestionContainer.current.addSuggestion(suggestion)
    updateSuggestionValue('')
  }
  return (
    <div className=' w-full h-[70px]'>
      <h3 className='text-lg font-semibold select-none'>
        ¿Tenes algo que contarnos sobre tu mascota?
      </h3>
      <form className='py-1 flex gap-2 z-50'>
        <SuggestionsTypeSelector handleType={updateSuggestionType} />
        <input
          placeholder='ejemplo: Likes bananas'
          className='w-full rounded-lg p-1.5 bg-section-dark'
          maxLength={30}
          onChange={handleChange}
          value={suggestion.value}
        />
        <button
          type='submit'
          onClick={addSuggestion}
          className='bg-header-light hover:bg-header-dark transition-colors rounded-lg px-3 capitalize font-medium select-none'
        >
          <RiAddLine size={20} />
        </button>
      </form>
    </div>
  )
}

export default Suggestions
