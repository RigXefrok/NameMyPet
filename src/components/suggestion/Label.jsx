const SuggestionLabel = ({ type, value, border }) => {
  return (
    <div
      className={`rounded-full px-3 font-medium capitalize bg-section-dark group select-none border-2 ${border}`}
    >
      <div
        className='hidden group-hover:flex items-center justify-center
        absolute top-0.5 right-0.5 m-0.5 w-6 h-5
        rounded-full bg-neutral-800 text-header-dark text-center text-xs font-bold'
      >
        x
      </div>
      {value}
    </div>
  )
}

export default SuggestionLabel
