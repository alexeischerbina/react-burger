import React, {useState, useEffect} from 'react';
import {PasswordInput, EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfileForm.module.css';
import {getCookie} from "../../services/utils";
import {token} from "../../services/slices/user";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const getUserInfo = async () => {
    if (!getCookie('accessToken')) {
      await token()
    }

    const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      }
    });
    const result = await response.json();
    if (result.success) {
      setFormData({...formData, ...result.user});
    }
  }

  useEffect(() => {
      // Нужно добавить проверку токена
      getUserInfo();
    },
    // eslint-disable-next-line
    []);

  const onFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const onSubmitForm = async (e) => {
    await onSaveButtonClick(e);
  }

  const onSaveButtonClick = async (e) => {
    e.preventDefault();

    if (!getCookie('accessToken')) {
      await token();
    }

    fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      },
      body: JSON.stringify({...formData})
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          console.log('Данные успешно сохранены');
        } else {
          console.log('Произошла ошибка');
        }
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  const onCancelBtnClick = (e) => {
    e.preventDefault();
    getUserInfo();
  }

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <div className={styles.input_wrapper}>
        <Input value={formData.name} onChange={onFieldChange} name={"name"} type={"text"} placeholder={"Имя"}/>
      </div>
      <div className={styles.input_wrapper}>
        <EmailInput value={formData.email} name={"email"} onChange={onFieldChange}/>
      </div>
      <div className={styles.input_wrapper}>
        <PasswordInput value={formData.password} name={"password"} onChange={onFieldChange}/>
      </div>
      <div className={styles.buttons_wrapper}>
        <Button type={"secondary"} size={"medium"} onClick={onCancelBtnClick}>Отмена</Button>
        <Button type={"primary"} size={"medium"} onClick={onSaveButtonClick}>Сохранить</Button>
      </div>
    </form>
  );
};

export default ProfileForm;