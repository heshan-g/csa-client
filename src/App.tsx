import { useState } from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const displayPage = (page: string) => {
    if (!isAuth) {
      return <Login />;
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
