import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer function for handling Email Reducer
const emailReducer = (prevState, action) => {
  
  if(action.type === 'USER_EMAIL_INPUT'){
    return { enteredEmail: action.val, emailIsValid: action.val.includes('@') };
  } 

  if(action.type === 'EMAIL_BLUR'){
    return { enteredEmail: prevState.enteredEmail, emailIsValid: prevState.enteredEmail.includes('@') };
  }

  return { enteredEmail: '', emailIsValid: false }; 
};

// Reducer function for handling Email Reducer
const passwordReducer = (prevState, action) => {
  
  if(action.type === 'USER_PASSWORD_INPUT'){
    return { enteredPassword: action.val, passwordIsValid: action.val.trim().length > 6 };
  } 

  if(action.type === 'PASSWORD_BLUR'){
    return {enteredPassword: prevState.enteredPassword, passwordIsValid: prevState.enteredPassword.trim().length > 6 };
  }

  return { enteredEmail: '', emailIsValid: false }; 
};


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Reducer Function for receiving email input and validating the email input
  const [emailState, dispatchEmailAction] = useReducer( emailReducer, { enteredEmail: '', emailIsValid: true });

  // Reducer Function for receiving email input and validating the email input
  const [passwordState, dispatchPasswordAction ] = useReducer(passwordReducer, { enteredPassword: '', passwordIsValid: true });

  const { emailIsValid } = emailState;
  const { passwordIsValid } = passwordState;

  //useEffect solution for form validity.
  useEffect(() => {

    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    }

  }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispatchEmailAction({ type: 'USER_EMAIL_INPUT',  val: event.target.value })
    
    // This below works but setting the state (formIsValid), which depends on another state (passwordIsValid) is still not optimal
    // because of how React schedules state updates. even though we are using useReducer() to get the lastest state updates (passwordState.passwordIsValid) it is not the optimal way.   
    // setFormIsValid(event.target.value.includes('@') && passwordState.passwordIsValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordAction({ type: 'USER_PASSWORD_INPUT',  val: event.target.value })

    // setFormIsValid(event.target.value.trim().length > 6 && emailState.emailIsValid);
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordAction({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.enteredEmail, passwordState.enteredPassword);
  };

  return (
    <Card className={classes.login}>
        <form onSubmit={submitHandler}>
            <div
              className={`${classes.control} ${ emailState.emailIsValid === false ? classes.invalid : '' }`}
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
              className={`${classes.control} ${ passwordState.passwordIsValid === false ? classes.invalid : '' }`}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={ passwordState.enteredPassword }
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
