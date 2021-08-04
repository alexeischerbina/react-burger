import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot_password.module.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const {isAuth} = useSelector(({user}) => user);
  const history = useHistory();
  const location = useLocation();

  const onChange = e => {
    setEmail(e.target.value);
  };

  const resetPassword = () => {
    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          history.push("/reset-password", {from: location});
        }
      })
      .catch(err => {
        throw new Error(err);
      })
  };

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  return (
    <div className={`${styles.container} mt-15`}>
      <h2 className={`text text_type_main-medium mt-30 mb-6`}>Восстановление пароля</h2>
      <div className={`${styles.wrapper} mb-6`}>
        <EmailInput name={'email'} size={'default'} value={email} onChange={onChange}/>
      </div>
      <Button type="primary" size="medium" onClick={resetPassword}>
        Восстановить
      </Button>
      <p className={"text text_type_main-default text_color_inactive mt-20"}>Вспомнили пароль? <Link to="/login"
                                                                                                     className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}
