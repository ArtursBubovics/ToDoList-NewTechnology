import './App.css';
import Box from '@mui/material/Box';
import ToDoLists from './components/To-do-Lists/TodoBlock';
import { Login } from './components/Login/Login';

function App() {

  return (
    <Box className="App">
      {/* <ToDoLists /> */}
      <Login />
    </Box>
  );
}

export default App;
