
import './App.css'
import { Header } from './common/Header/Header'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'

function App() {
 
  return (
    <>
      <Header/>
      <div>
        <Home/>
        <Register/>
        <Login/>
      </div>
    </>
  )
}

export default App
