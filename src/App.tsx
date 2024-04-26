import './App.css';
import Box from '@mui/material/Box';
import ToDoLists from './components/To-do-Lists/TodoUnitedBlock';
import Profile from './components/Profile/ProfileUnitedBlock';
import { Login } from './components/Login/Login';
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Box className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<Login />} />
          <Route path="/ToDoLists" element={<ToDoLists />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
