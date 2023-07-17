import { useEffect, useState } from 'react'
import { Login, Register } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from './components/AppBar';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    const user = localStorage.getItem('user');

    setIsAuth(!!user);
    setCurrentPage(user ? 'Dashboard' : 'login');
  }, []);

  const displayPage = (page: string) => {
    if (!isAuth) {
      return <>
        {page === 'register' && <Register setCurrentPage={setCurrentPage} />}
        {page === 'login' && <Login setCurrentPage={setCurrentPage} setIsAuth={setIsAuth} />}
      </>
    }

    return (
      <AppBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    );
  }

  return (
    <>
      {displayPage(currentPage)}
      <ToastContainer />
    </>
  )
}

export default App;

