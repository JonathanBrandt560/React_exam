import './App.css';
import { UserList } from './UserList';
import { Home } from './Home';
import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center w-full'>
        <Routes>
          <Route path ='/' element={<Home />}></Route>
          <Route path='/userlist' element={<UserList />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
