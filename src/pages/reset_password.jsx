import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset_password.module.css';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const {isAuth} = useSelector(({user}) => user);
  const history = useHistory();
  const location = useLocation();

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeToken = e => {
    setToken(e.target.value);
  }

  const resetPassword = () => {
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      body: JSON.stringify({
        password,
        token
      })
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          console.log(result.message);
          history.replace("/login")
        } else if (result.message) {
          console.log(result.message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  if (!location.state || (location.state && location.state.from.pathname !== '/forgot-password')) {
    return (
      <Redirect to={"/forgot-password"}/>
    );
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await resetPassword();
  }

  return (
    <div className={`${styles.container} mt-15`}>
      <form onSubmit={onSubmitForm}>
        <h2 className={`text text_type_main-medium mt-30 mb-6`}>Восстановление пароля</h2>
        <div className={`${styles.wrapper} mb-6`}>
          <PasswordInput name={'password'} size={'default'} value={password} onChange={onChangePassword}/>
        </div>
        <div className={`${styles.wrapper} mb-6`}>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            name={'token'}
            value={token}
            error={false}
            errorText={'Ошибка'}
            onChange={onChangeToken}
            size={'default'}
          />
        </div>
        <Button type="primary" size="medium" onClick={resetPassword}>
          Сохранить
        </Button>
        <p className={"text text_type_main-default text_color_inactive mt-20"}>
          Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}
