import React, {ChangeEventHandler, FC, FormEventHandler, useState} from 'react';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import {useAppSelector} from "../services/hooks";
import {ILocation} from "../services/types";

import styles from './reset_password.module.css';

const ResetPasswordPage:FC = () => {
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const {isAuth} = useAppSelector(({user}) => user);
  const history = useHistory();
  const location = useLocation<ILocation>();

  const onChangePassword: ChangeEventHandler = e => {
    const element = e.target as HTMLInputElement;
    setPassword(element.value);
  };

  const onChangeToken: ChangeEventHandler = e => {
    const element = e.target as HTMLInputElement;
    setToken(element.value);
  }

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  if (!location.state || (location.state && location.state.from && location.state.from.pathname !== '/forgot-password')) {
    return (
      <Redirect to={"/forgot-password"}/>
    );
  }

  const onSubmitForm: FormEventHandler = async (e) => {
    e.preventDefault();
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
        <Button type="primary" size="medium">
          Сохранить
        </Button>
        <p className={"text text_type_main-default text_color_inactive mt-20"}>
          Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export {ResetPasswordPage};
