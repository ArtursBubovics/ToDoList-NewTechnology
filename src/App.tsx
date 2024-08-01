import './App.css';
import Box from '@mui/material/Box';
import ToDoLists from './components/To-do-Lists/TodoUnitedBlock';
import Profile from './components/Profile/ProfileUnitedBlock';
import { Login } from './components/Login/Login';
import { Route, Routes } from "react-router-dom";
import { LinearProgress } from '@mui/material';
import Archive from './components/Archive/Archive';
import Notification from './components/Notification/Notification';
import { AlertProvider } from './common/Alerts/AlertContext';

function App() {

  return (
      <AlertProvider>
        <Box className="App" sx={{ position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<Login />} />
            <Route path="/ToDoLists" element={<ToDoLists />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>

          <Archive />
          <Notification />

          {false && <LinearProgress variant="determinate" value={20} sx={{ position: 'absolute', zIndex: 1, top: 0, right: 0, left: 0, height: '3px' }} />}
        </Box>
      </AlertProvider>
  );
}

export default App;
