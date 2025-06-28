import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const baseUrl = "http://localhost:5000";

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add baseUrl={baseUrl} />} />
          <Route path='/list' element={<List baseUrl={baseUrl} />} />
          <Route path='/orders' element={<Orders baseUrl={baseUrl} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App