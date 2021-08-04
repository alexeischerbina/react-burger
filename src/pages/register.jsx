import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';
import {register} from "../services/slices/user";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const {isAuth} = useSelector(({user}) => user);

  const onChangeFormData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const onBtnRegisterClick = () => {

    dispatch(register({...formData}));
  }

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <div className={`${styles.container} mt-15`}>
      <h2 className={`text text_type_main-medium mt-30 mb-6`}>Регистрация</h2>
      <div className={`${styles.wrapper} mb-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          error={false}
          value={formData.name}
          errorText={'Ошибка'}
          size={'default'}
          onChange={onChangeFormData}
        />
      </div>
      <div className={`${styles.wrapper} mb-6`}>
        <EmailInput name={'email'} size={'default'} value={formData.email} onChange={onChangeFormData}/>
      </div>
      <div className={`${styles.wrapper} mb-6`}>
        <PasswordInput name={'password'} size={'default'} value={formData.password} onChange={onChangeFormData}/>
      </div>
      <Button type="primary" size="medium" onClick={onBtnRegisterClick}>
        Зарегистрироваться
      </Button>
      <p className={"text text_type_main-default text_color_inactive mt-20 mb-4"}>Уже зарегистрированы? <Link
        to="/login" className={styles.link}>Войти</Link></p>
    </div>
  );
}
