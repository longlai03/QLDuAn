import { Route, Routes } from 'react-router-dom';
import '../styles/global.css'
import DangNhap from './pages/DangNhap';
import BangDuAn from './pages/QLDuAn';
import BangTask from './pages/QLTask';
import PageMenu from './pages/Menu';

function App() {
  return (
    <>
      <PageMenu />
      <Routes>
        <Route path='/' element={<DangNhap />} />
        <Route path='/QLDuAn' element={<BangDuAn />} />
        <Route path='/QLTask' element={<BangTask />} />
      </Routes>
    </>
  );
}

export default App;
