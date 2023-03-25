import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer function for handling Email Reducer
const emailReducer = (prevState, action) => {
  
  if(action.type === 'USER_INPUT'){
    return { enteredEmail: action.val, emailIsValid: action.val.includes('@') };
  } 

  if(action.type === 'INPUT_BLUR'){
    return { enteredEmail: prevState.enteredEmail, emailIsValid: prevState.enteredEmail.includes('@') };
  }

  return { enteredEmail: '', emailIsValid: false }; 
};


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Reducer Function for receving email input and validating the email input
  const [emailState, dispatchEmailAction] = useReducer( emailReducer, { enteredEmail: '', emailIsValid: false } );

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmailAction({ type: 'USER_INPUT',  val: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.emailIsValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
        <form onSubmit={submitHandler}>
            <div
              className={`${classes.control} ${
                emailState.emailIsValid === false ? classes.invalid : ''
              }`}
            >
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                id="email"
                value={ emailState.enteredEmail }
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
              />
            </div>
            <div
              className={`${classes.control} ${
                passwordIsValid === false ? classes.invalid : ''
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={enteredPassword}
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
