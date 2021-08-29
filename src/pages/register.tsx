import React, {ChangeEventHandler, FC, FormEventHandler, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../services/hooks";
import {Link, Redirect} from 'react-router-dom';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';
import {register} from "../services/slices/user";

interface IFormRegisterState {
  name: string;
  email: string;
  password: string;
}

const RegisterPage:FC = () => {
  const [formData, setFormData] = useState<IFormRegisterState>({
    name: '',
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(({user}) => user);

  const onChangeFormData: ChangeEventHandler = e => {
    const element = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [element.name]: element.value
    });
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

  const onSubmitForm: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(register({...formData}));
  }

  return (
    <div className={`${styles.container} mt-15`}>
      <form onSubmit={onSubmitForm}>
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
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p className={"text text_type_main-default text_color_inactive mt-20 mb-4"}>
          Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export {RegisterPage};
