import React, {
    useEffect,
    FormEventHandler,
    ChangeEventHandler,
    SyntheticEvent, FC
} from 'react';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {PasswordInput, EmailInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfileForm.module.css';
import {getUserData, updateUserFormData, setUserData} from '../../services/slices/user';

const ProfileForm:FC = () => {
  const {name, email, password} = useAppSelector(({user}) => user.form);
  const formData = {name, email, password};
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getUserData());
    },
    [dispatch]);

  const onFieldChange: ChangeEventHandler = e => {
    const element = e.target as HTMLInputElement;
    if (element.name === 'name' || element.name === 'email' || element.name === 'password') {
        dispatch(updateUserFormData( {
          [element.name]: element.value
        }));
    }
  }

  const onSubmitForm: FormEventHandler = async (e) => {
    e.preventDefault();
    dispatch(setUserData(formData));
  }

  const onCancelBtnClick: (() => void) | ((e: SyntheticEvent) => void) = (e) => {
    e.preventDefault();
    dispatch(getUserData());
  }

  return (
    <form className={`${styles.form} mt-20 pb-20`} onSubmit={onSubmitForm}>
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
        <Button type={"primary"} size={"medium"}>Сохранить</Button>
        <Button type={"secondary"} size={"medium"} onClick={onCancelBtnClick}>Отмена</Button>
      </div>
    </form>
  );
};

export default ProfileForm;