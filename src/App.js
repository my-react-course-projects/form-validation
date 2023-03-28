import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const getUserLoggedInfo = localStorage.getItem('isLoggedIn');
    if(getUserLoggedInfo === '1' ){
      setIsLoggedIn(true);
    }

  }, []);
  
  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logoutHandler = () => {
    localStorage.setItem('isLoggedIn', '0');
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
  );
}

export default App;
