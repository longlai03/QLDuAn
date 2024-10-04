import { Route, Routes, useNavigate } from 'react-router-dom';
import './styles/global.css'
import DangNhap from './components/DangNhap';
import BangDuAn from './components/QLDuAn';
import BangTask from './components/QLTask';
import PageMenu from './components/Menu';
import InsertFormQLDA from './components/InsertQLDA';
import { useState } from 'react';
import UpdateFormQLDA from './components/UpdateQLDA';
import InsertFormQLTask from './components/InsertQLTask';
import UpdateFormQLTask from './components/UpdateQLTask';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <>
      {isLoggedIn ? (<PageMenu />) : null}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<BangDuAn />} />
            <Route path='/QLDuAn' element={<BangDuAn />} />
            <Route path='/InsertQLDA' element={<InsertFormQLDA />} />
            <Route path='/UpdateQLDA/:projectId' element={<UpdateFormQLDA />} />
            <Route path='/QLTask' element={<BangTask />} />
            <Route path='/InsertQLTask' element={<InsertFormQLTask />} />
            <Route path='/UpdateQLTask/:taskId' element={<UpdateFormQLTask />} />
            <Route path='*' element={<BangDuAn />} />
          </>
        ) : (
          <><Route path='/DangNhap' element={<DangNhap onLogin={handleLogin} />} />
            <Route path='*' element={<DangNhap onLogin={handleLogin} />} />
          </>
        )}

      </Routes>
    </>
  )
}

export default App;
