import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './RegistrationForm'
import Login from './Login'
import Dash from './Dashboard'

function App() {


  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Dash" element={<Dash/>}/>
    </Routes>
    </BrowserRouter>
      <Dash />
    </div>
  )
}

export default App