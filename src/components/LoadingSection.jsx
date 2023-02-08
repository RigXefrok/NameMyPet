import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { LOADING_FRASES } from '../constants/loadingFrases'
import Card from './Card'
import namerService from '../service/namer'
import { RiErrorWarningLine } from 'react-icons/ri'
const LoadingSection = forwardRef(
  ({ pet, suggestions, updateResults, goResults, reset }, ref) => {
    const [frasesIndex, setFrasesIndex] = useState(0)
    const [loadingState, setLoadingState] = useState('unload')

    useEffect(() => {
      const interval = setInterval(() => {
        setFrasesIndex(Math.floor(Math.random() * LOADING_FRASES.length))
      }, 5000)
      return () => {
        clearInterval(interval)
      }
    }, [])

    const generateNames = async (pet, suggestions) => {
      setLoadingState('loading')
      await namerService
        .getPetNames(pet, suggestions)
        .then((data) => updateResults(data))
        .then(() => setLoadingState('unload'))
        .then(goResults)
        .catch((e) => {
          setLoadingState('error')
        })
    }

    useImperativeHandle(ref, () => {
      return {
        generateNames: (pet, suggestions) => generateNames(pet, suggestions),
      }
    })

    if (!pet) return

    return (
      <div className='flex flex-col gap-5 h-full w-4/5 items-center justify-evenly m-auto'>
        <Card>
          <div className='h-fit p-5'>
            <h3 className='text-lg font-semibold select-none h-fit'>
              Se están generando nombres para tu mascota 💖:
            </h3>
            <div className='pl-2 text-neutral-300'>
              <p className='pt-1'>Mi mascota es un {pet.name}.</p>
              {suggestions.characteristics.length > 0 && (
                <p className='pt-1'>
                  Las características de mi {pet.name} son{' '}
                  {suggestions.characteristics.map(({ value }, index) =>
                    index === 0 ? value : `, ${value}`
                  )}
                </p>
              )}
              {suggestions.references.length > 0 && (
                <p className='pt-1'>
                  Me gustaría que el nombre este relacionado con{' '}
                  {suggestions.references.map(({ value }, index) =>
                    index === 0 ? value : `, ${value}`
                  )}
                </p>
              )}
              {suggestions.includes.length > 0 && (
                <p className='pt-1'>
                  Quiero que el nombre sea includes a{' '}
                  {suggestions.includes.map(({ value }, index) =>
                    index === 0 ? value : `, ${value}`
                  )}
                </p>
              )}
            </div>
          </div>
        </Card>

        <div className='flex w-full items-center gap-8'>
          <div className='w-1/2'>
            <Card>
              {loadingState === 'unload' && (
                <p>
                  Un error inesperado ha ocurrido, lamentamos las molestias 😔
                </p>
              )}
              {loadingState === 'loading' && (
                <div className='flex items-center gap-1 h-20'>
                  <svg
                    aria-hidden='true'
                    className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-header-dark'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  {LOADING_FRASES[frasesIndex]}
                </div>
              )}
              {loadingState === 'error' && (
                <div className='py-3 flex items-center'>
                  <p>Oops... Un error le ocurrió a nuestros escritores 📑</p>
                  <button
                    onClick={reset}
                    className='rounded-lg bg-header-light  px-3 py-2'
                  >
                    Volver
                  </button>
                </div>
              )}
            </Card>
          </div>
          <div className='w-1/2'>
            <Card>
              <div className='py-5 flex items-center gap-2'>
                <RiErrorWarningLine size={40} />
                <p className='text-sm'>
                  Nuestros escritores continúan aprendiendo para mejorar los
                  nombres datos 😉 ...{' '}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
)
export default LoadingSection
