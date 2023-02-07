import { BsWhatsapp } from 'react-icons/bs'
import Card from './Card'
import NameList from './NameList'

const ResultsSection = ({ results, refreshResults, reset }) => {
  return (
    <div className='flex flex-col gap-5 h-full w-4/5 items-center justify-center m-auto'>
      <Card>
        <NameList results={results} refreshResults={refreshResults} />
      </Card>
      <div className='flex w-fit h-full gap-8 items-center self-start'>
        <Card>
          <div className='flex items-center gap-2'>
            <p className='font-semibold select-none'>Comparte en</p>
            <ul className='flex gap-2'>
              <li>
                <div className='p-2 border-2 rounded-lg border-header-dark flex hover:bg-header-dark transition-colors'>
                  <a
                    target='_blank'
                    href={`https://api.whatsapp.com/send?text=${results.join(
                      '\n'
                    )}`}
                  >
                    <BsWhatsapp />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        <div>
          <button
            onClick={reset}
            className='rounded-lg bg-header-light hover:bg-header-dark transition-colors  px-3 py-2'
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsSection
