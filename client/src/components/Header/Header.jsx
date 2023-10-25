import '../Header/Header.css'
import NSlogo2 from "../../assets/image/logo.png"

function Header() {
  return (
    <div>
      <header className='p-4 flex justify-between'>
        <a href='' className='flex items-center gap-1'>
          <img src={NSlogo2} width={220} height={70} alt="Nomada Suite Logo" />
        </a>
        <div className='flex gap-2 border border-gray-300 rounded-full py-4 px-4 shadow-md shadow-gray-400'>
          <div>Ubicación</div>
          <div className='border-l border-grey-300'></div>
          <div>Rango de fechas</div>
          <div>Huépedes</div>
          <button className='bg-primary text-white p-1 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        <div>

        </div>
      </header>
    </div>
  )
}
export default Header;