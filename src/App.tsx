import { Carousel } from './components/Carousel'
import { Navbar } from './components/Navbar'
import { AboutUs } from './components/AboutUs'
import Dashboard from './components/pages/Dashboard'
import { usePage } from './hooks/usePage'


function App() {
  const {page, setPage} = usePage()
  console.log(page)

  return (
    <>
      {page === 'dashboard' && (
        <Dashboard />
      )}
      {
        page !== 'dashboard' && (
          <>
            <Navbar setCurrentPage={setPage} />
            {page === 'home' && <Carousel goToDashboard={() => setPage('dashboard')} />}
            {page === 'about' && <AboutUs />}
          </>
        )
      }

      {/* <Carousel /> */}
    </>
  )
}

export default App
