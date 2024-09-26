import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/global.css'
import DangNhap from './components/DangNhap';
import BangDuAn from './components/QLDuAn';
import BangTask from './components/QLTask';
import PageMenu from './components/Menu';
import InsertFormQLDA from './components/InsertQLDA';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  if (isLoggedIn) {
    return (
      <>
        <PageMenu />
        <Routes>
          <Route path='/' element={<BangDuAn />} />
          <Route path='/QLDuAn' element={<BangDuAn />} />
          <Route path='/InsertQLDA' element={<InsertFormQLDA />} />
          <Route path='/QLTask' element={<BangTask />} />
          <Route path='*' element={<BangDuAn />} />
        </Routes>
      </>
    )
  }
  else {
    return (
      <>
        <Routes>
          <Route path='/DangNhap' element={<DangNhap onLogin={handleLogin} />} />
          <Route path='*' element={<Navigate to="/DangNhap" />} />
        </Routes>
      </>
    );
  }
}

export default App;
