import React, {ChangeEventHandler, FC, FormEventHandler, useState} from 'react';
import {useAppSelector} from "../services/hooks";
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot_password.module.css';
import {burgerAPI} from "../services/utils";

const ForgotPasswordPage:FC = () => {
  const [email, setEmail] = useState('');
  const {isAuth} = useAppSelector(({user}) => user);
  const history = useHistory();
  const location = useLocation();

  const onChange:ChangeEventHandler = e => {
    const element = e.target as HTMLInputElement;
    setEmail(element.value);
  };

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  const onSubmitForm:FormEventHandler = (e) => {
    e.preventDefault();
    fetch(`${burgerAPI}/password-reset`, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          history.replace("/reset-password", {from: location});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={`${styles.container} mt-15`}>
      <form onSubmit={onSubmitForm}>
        <h2 className={`text text_type_main-medium mt-30 mb-6`}>Восстановление пароля</h2>
        <div className={`${styles.wrapper} mb-6`}>
          <EmailInput name={'email'} size={'default'} value={email} onChange={onChange}/>
        </div>
        <Button type="primary" size="medium">
          Восстановить
        </Button>
        <p className={"text text_type_main-default text_color_inactive mt-20"}>
          Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export {ForgotPasswordPage};