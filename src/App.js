import React,{useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './contextss/auth-context';


function App() {
const ctxt=useContext(AuthContext)
  return (
   <React.Fragment>
    
      <MainHeader  />
      <main>
        {!ctxt.isLoggedIn && <Login  />}
        {ctxt.isLoggedIn && <Home  />}
      </main>
      </React.Fragment>
    
   
  );
}

export default App;
