
import './App.css';
import Nav from './Components/Nav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
// import Switch from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import UserProjects from './Components/UserProjects';
import AddProject from './Components/AddProject';
import EditProject from './Components/EditProject';


function App() {
  return (
    <Router>
      <Nav/>
      <div className="App">
        <Routes>
          <Route index element ={<Home/>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='/register' element ={<Register/>}/>
          <Route path='/profile' element = {<Profile/>}/>
          <Route path='/user/:userId' element = {<UserProjects/>}/> 
          <Route path='/addProject' element ={<AddProject/>}/>
          <Route path='/editProject/:projectId' element ={<EditProject/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
