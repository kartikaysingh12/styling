import React, { useState, useEffect,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailReducer=(state,action)=>{
  if(action.type==='User_Input'){
return{value:action.val,isValid:action.val.includes('@')};
  }
  if(action.type==='Input_Blur'){
    return{value:state.value,isValid:state.value.includes('@')};
  }
  return{value:'',isValid:false};
};
const passwordReducer=(state,action)=>{
  if(action.type==='User_Input'){
    return{value:action.val,isValid:action.val.trim().length>6};
      }
      if(action.type==='Input_Blur'){
        return{value:state.value,isValid:state.value.trim().length>6};
      }
      return{value:'',isValid:false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState,dispatchEmail]=useReducer(emailReducer,{
    value:'',
    isValid:null,
  });
  const[passwordState,dispatchPass]=useReducer(passwordReducer,{
    value:'',
    isValid:null
  })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'User_Input',val:event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type:'User_Input',val:event.target.value});

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'Input_Blur'});
  };

  const validatePasswordHandler = () => {
    dispatchPass({type:'Input_Blur'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
