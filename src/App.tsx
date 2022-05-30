
import './App.css';
import Nav from './Components/Nav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
// import Switch from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserProjects from './Pages/UserProjects';
import AddProject from './Pages/AddProject';
import EditProject from './Pages/EditProject';
import { ThemeContext } from './Features/ThemeProvider';
import { useContext } from 'react';


function App() {
  const {theme} = useContext(ThemeContext)
  document.body.style.backgroundColor = theme.backgroundPrimary
  return (
    <Router>
      <Nav/>
      <div className="App">
        <Routes>
          <Route index element ={<Home/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/register' element ={<Register/>}/>
          <Route path='/user/:userId' element = {<UserProjects/>}/> 
          <Route path='/addProject' element ={<AddProject/>}/>
          <Route path='/editProject/:projectId' element ={<EditProject/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
