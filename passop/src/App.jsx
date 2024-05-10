
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'
function App() {


  return (
    <>
      <Navbar />
      <div className='min-h-[87vh]'>
        <Manager />

      </div>

      <Footer />
    </>
  )
}

export default App
