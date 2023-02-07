const Section = ({ children }) => {
  return (
    <div className="shrink-0 w-full px-10 py-5 pt-0 2xl:px-36 2xl:py-20 2xl:pt-0">
      <section className='p-10 bg-section-dark w-full h-full rounded-lg flex flex-col justify-between basis-full gap-10 2xl:px-36 2xl:py-20'>
        {children}
      </section>
    </div>
  )
}
export default Section
