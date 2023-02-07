import Header from './components/Header'
import Suggestions from './components/Suggestions'
import PetSelector from './components/PetSelector'
import Card from './components/Card'
import Section from './components/Section'
import NameList from './components/NameList'
import { useRef, useState } from 'react'
import SuggestionsContainer from './components/suggestion/Container'
import { motion as m } from 'framer-motion'
import LoadingSection from './components/LoadingSection'
import { MdInput, MdDoneAll } from 'react-icons/md'
import { AiOutlineFileSearch } from 'react-icons/ai'
import ResultsSection from './components/ResulstSection'

const variants = {
  input: {
    x: 0,
  },
  loading: {
    x: '-100%',
  },
  results: {
    x: '-200%',
  },
}

const progress_variants = {
  input: {
    x: '-200%',
  },
  loading: {
    x: '0',
  },
  results: {
    x: '200%',
  },
}

function Home() {
  const suggestionContainerRef = useRef()
  const petSelectorRef = useRef()
  const loadingSectionRef = useRef()

  const [results, setResults] = useState([])

  const [index, setIndex] = useState('input')

  const goResults = () => {
    setIndex('results')
  }

  const goLoading = () => {
    setIndex('loading')
    loadingSectionRef.current.generateNames(
      petSelectorRef.current.getPet,
      suggestionContainerRef.current.getSuggestions
    )
  }

  const updateResults = (results) => {
    setResults(results)
  }

  const refreshResults = () => {
    goLoading()
    loadingSectionRef.current.generateNames(
      petSelectorRef.current.getPet,
      suggestionContainerRef.current.getSuggestions
    )
  }

  const reset = () => {
    setIndex('input')
    setResults([])
  }
  return (
    <div className='bg-neutral-800 h-screen w-screen text-base flex items-center'>
      <Header />
      <main className='h-full w-full flex flex-col pt-14'>
        {/* progress bar */}
        <div className='w-full h-10 py-6 relative flex gap-8 items-center justify-center z-10 '>
          <m.div
            animate={index}
            variants={progress_variants}
            className='absolute w-8 h-8 bg-header-dark rounded-full -z-10'
          />
          <div
            className='rounded-full w-8 h-8 flex items-center justify-center relative 
          before:absolute before:w-6 before:h-0.5 before:bg-neutral-400 before:left-8 before:translate-x-1'
          >
            <MdInput size={20} />
          </div>
          <div
            className='rounded-full w-8 h-8 flex items-center justify-center relative
          before:absolute before:w-6 before:h-0.5 before:bg-neutral-400 before:left-8 before:translate-x-1'
          >
            <AiOutlineFileSearch size={20} />
          </div>
          <div className='rounded-full w-8 h-8 flex items-center justify-center '>
            <MdDoneAll size={20} />
          </div>
        </div>

        {/* sections */}
        <div className='basis-full flex w-screen h-full overflow-hidden'>
          <m.div className='flex w-screen' variants={variants} animate={index}>
            <Section>
              <div className='flex gap-6 w-full z-20 mb-4'>
                <Card>
                  <PetSelector ref={petSelectorRef} />
                </Card>
                <Card>
                  <Suggestions suggestionContainer={suggestionContainerRef} />
                </Card>
              </div>

              <div className='flex w-full h-full gap-8'>
                <div className='basis-full h-full'>
                  <SuggestionsContainer ref={suggestionContainerRef} />
                </div>
              </div>
              <div>
                <div className='flex items-center justify-center h-fit w-fit'>
                  <Card>
                    <div className='h-fit flex items-center justify-center gap-2'>
                      <p>Estoy listo para conocer esos nombres 😄!!!</p>
                      <button
                        onClick={goLoading}
                        className='bg-header-light hover:bg-header-dark transition-colors rounded-lg px-3 py-2 w-fit h-fit'
                      >
                        Enviar
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
            </Section>

            <Section>
              <LoadingSection
                pet={petSelectorRef.current?.getPet}
                suggestions={suggestionContainerRef.current?.getSuggestions}
                updateResults={updateResults}
                goResults={goResults}
                reset={reset}
                ref={loadingSectionRef}
              />
            </Section>

            <Section>
              <ResultsSection
                results={results}
                refreshResults={refreshResults}
                reset={reset}
              />
            </Section>
          </m.div>
        </div>
      </main>
    </div>
  )
}

export default Home
