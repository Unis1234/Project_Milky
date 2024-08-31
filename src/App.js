import React from 'react';
import AppBar from '@mui/material/AppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InventoryForm from './components/InventoryForm/InventoryForm';
import UpdatedInventoryForm from './components/UpdatedInventoryForm/UpdateInventoryForm';

import UserRegisterForm from './components/UserRegisterForm/UserRegisterForm';
import UpdatedRegisterForm from './components/UpdatedRegisterForm/UpdatedRegisterForm';





function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
          
        </AppBar>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/inventory" element={<InventoryForm />} />
          <Route path="/update-inventory" element={<UpdatedInventoryForm />} />

          <Route path="/register" element={<UserRegisterForm />} />
          <Route path="/update-register" element={<UpdatedRegisterForm />} />
          
         
           
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
















// import logo from './logo.svg';
// import './App.css';
// import InventoryForm from './InventoryForm/InventoryForm';

// function App() {
//   return (
//     <div className="App">
//      <InventoryForm/>
//     </div>
//   );
// }

// export default App;
