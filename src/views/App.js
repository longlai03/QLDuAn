import { Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/global.css'
import DangNhap from './pages/DangNhap';
import BangDuAn from './pages/QLDuAn';
import BangTask from './pages/QLTask';
import PageMenu from './pages/Menu';
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
