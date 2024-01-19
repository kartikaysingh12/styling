import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../contextss/auth-context';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctxt)=>{
        return(
          <nav className={classes.nav}>
          <ul>
            {ctxt.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {ctxt.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctxt.isLoggedIn && (
              <li>
                <button onClick={ctxt.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
        )
      }}
   
    </AuthContext.Consumer>
  );
};

export default Navigation;
