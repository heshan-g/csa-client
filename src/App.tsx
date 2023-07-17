import { useEffect, useState } from 'react'
import { Login, Register, Dashboard } from './pages';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    const user = localStorage.getItem('user');

    setIsAuth(!!user);
    setCurrentPage(user ? 'dashboard' : 'login');
  }, []);

  const displayPage = (page: string) => {
    if (!isAuth) {
      return <>
        {page === 'register' && <Register setCurrentPage={setCurrentPage} />}
        {page === 'login' && <Login setCurrentPage={setCurrentPage} setIsAuth={setIsAuth} />}
      </>
    }

    return (
      <>
        <div>Header</div>
        {page === 'dashboard' && <Dashboard />}
      </>
    );
  }

  return (
    <>
      {displayPage(currentPage)}
    </>
  )
}

export default App
