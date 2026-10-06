import { UserListPage } from './pages/UserListPage';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center w-full'>
        <Routes>
          <Route path ='/' element={<HomePage />}></Route>
          <Route path='/userlist' element={<UserListPage />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
