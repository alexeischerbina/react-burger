import React, {useState} from 'react';
import {Link, Redirect, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';
import {login} from "../services/slices/user";

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const {isAuth} = useSelector(({user}) => user);
  const {state} = useLocation();

  const onChangeField = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  if (isAuth) {
    return (
      <Redirect to={(state && state.from) || "/"}/>
    );
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(login({...formData}))
  }

  return (
    <div className={`${styles.container} mt-15`}>
      <form onSubmit={onSubmitForm}>
        <h2 className={`text text_type_main-medium mt-30 mb-6`}>Вход</h2>
        <div className={`${styles.wrapper} mb-6`}>
          <EmailInput name={'email'} size={'default'} value={formData.email} onChange={onChangeField}/>
        </div>
        <div className={`${styles.wrapper} mb-6`}>
          <PasswordInput name={'password'} size={'default'} value={formData.password} onChange={onChangeField}/>
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
        <p className={"text text_type_main-default text_color_inactive mt-20 mb-4"}>
          Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className={"text text_type_main-default text_color_inactive"}>
          Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
        </p>
      </form>
    </div>
  );
}
