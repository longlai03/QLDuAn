import { Route, Routes, useNavigate } from 'react-router-dom';
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

  if (isLoggedIn == true) {
    return (
      <>
        <PageMenu />
        <Routes>
          <Route path='/' element={<BangDuAn />} />
          <Route path='/QLDuAn' element={<BangDuAn />} />
          <Route path='/QLTask' element={<BangTask />} />
        </Routes>
      </>
    )
  }
  else {
    return (
      <>
        <Routes>
          <Route path='*' element={<DangNhap onLogin={handleLogin} />} />
        </Routes>
      </>
    );
  }
}

export default App;
