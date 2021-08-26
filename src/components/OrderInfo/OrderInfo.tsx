import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {useLocation, useParams, matchPath} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './OrderInfo.module.css';
import {getData} from "../../services/slices/burgerIngredients";
import {dataURL} from "../../pages/home";
import {wsConnectionStart} from '../../services/slices/ws';
import {wsUserConnectionStart} from '../../services/slices/wsUser';
import {humanReadableDate} from "../../services/utils";

import {IOrder} from "../../services/types";
import {IIngredient} from "../../services/types";

const OrderInfo: FC<{ className?: string }> = () => {
    const location = useLocation();
    let {orderId} = useParams<{ orderId: string }>();
    const ordersCommon = useAppSelector(({orders}) => orders);
    const orderUser = useAppSelector(({ordersUser}) => ordersUser);
    const dispatch = useAppDispatch();
    const {data} = useAppSelector(({data}) => data);

    if (!orderId) { //При переходе из Личного кабинета useParams не работает. Пришлось задействовать matchPath
        const match: { params: { orderId: string } } | null = matchPath(location.pathname, {
            path: '/profile/orders/:orderId',
            exact: true,
            strict: false
        });
        if (match) {
            orderId = match.params.orderId;
        }
    }

    const orders = location.pathname.indexOf('profile') >= 0 ? orderUser.orders : ordersCommon.orders.orders;

    React.useEffect(() => {
        if (data.length === 0) {
            dispatch(getData(dataURL));
        }
        if (!orders || orders.length === 0) {
            if (location.pathname.indexOf('profile') >= 0) {
                dispatch(wsUserConnectionStart());
            } else {
                dispatch(wsConnectionStart());
            }
        }
    }, [dispatch, data.length, orders, location.pathname]);

    if ((!orders || orders.length === 0) || !data) {
        return (
            <div className={styles.wrapper}>
                <span className={'text text_type_main-large'}>
                  Загрузка...
                </span>
            </div>
        );
    }

    const order = orders.find((order: IOrder) => order._id === orderId);

    type TCompositionIngredient = {
        qty: number;
        name?: string;
        img?: string;
        price?: number;
    };
    type TComposition = {
        [key: string]: TCompositionIngredient
    };
    const composition: TComposition = {};
    if (!order) {
        return (
            <div className={styles.wrapper}>
                <span className={'text text_type_main-large'}>
                  Заказ не найден
                </span>
            </div>
        );
    }
    order.ingredients.forEach((ingredient: string) => {
        if (composition[ingredient]) {
            composition[ingredient].qty += 1;
        } else {
            composition[ingredient] = {qty: 1};
        }
    });
    let total = 0;
    for (const ingredient in composition) {
        const found = data.find((item: IIngredient) => item._id === ingredient);
        if (found) {
            const {name, image_mobile, price} = found;
            composition[ingredient].name = name;
            composition[ingredient].img = image_mobile;
            composition[ingredient].price = price;
            total += price * composition[ingredient].qty;
        }
    }

    const printComposition = (composition: TComposition) => {
        const arr = [];
        for (const ingredient in composition) {
            arr.push((
                <li key={ingredient} className={styles.ingredient_info}>
                    <div className={styles.ingredient_icon_name}>
                        <img
                            className={`${styles.ingredient_icon} mr-4`}
                            src={composition[ingredient].img}
                            alt=""
                        />
                        <span className={`text text_type_main-default`}>{composition[ingredient].name}</span>
                    </div>
                    <div className={styles.ingredient_qty_price}>
                        <span className={'text text_type_digits-default'}>{composition[ingredient].qty}</span>
                        <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
                        <span className={'text text_type_digits-default mr-2'}>{composition[ingredient].price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </li>
            ))
        }
        return arr;
    }

    const statusText = (status: string) => {
        const style: { color?: string } = {};
        let text = ''
        switch (status) {
            case 'created':
                text = 'Создан';
                break;
            case 'pending':
                text = 'Готовится';
                break;
            case 'done':
                text = 'Выполнен';
                style.color = '#00CCCC';
                break;
            default:
        }
        return (
            <p className="text text_type_main-default mb-15" style={style}>{text}</p>
        );
    }

    return (
        <div className={styles.wrapper}>
            <p className={`text text_type_digits-default mb-10 ${styles.align_center}`}>#{order.number}</p>
            <p className={'text text_type_main-medium mb-3'}>{order.name}</p>
            {statusText(order.status)}
            <p className={'text text_type_main-medium mb-6'}>Состав:</p>
            <ul className={`${styles.composition} mb-10 pr-6`}>
                {printComposition(composition)}
            </ul>
            <div className={styles.time_total}>
        <span
            className="text text_type_main-default text_color_inactive">{humanReadableDate(new Date(order.createdAt))}</span>
                <div className={styles.total}><span
                    className={'text text_type_digits-default mr-2'}>{total}</span><CurrencyIcon
                    type="primary"/></div>
            </div>
        </div>
    );
}

export default OrderInfo;