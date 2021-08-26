import {useRef, FC} from 'react';
import {useDispatch} from 'react-redux';
import {useDrag, useDrop} from 'react-dnd';
import {useHistory, useLocation} from 'react-router-dom';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {removeIngredient} from '../../services/slices/burgerConstructor';
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css';
import {IIngredient} from "../../services/types";

interface IConstructorItem {
  ingredient: IIngredient,
  index: number,
  moveComponent: (dragIndex: number, hoverIndex: number) => void
}

export const BurgerConstructorItem:FC<IConstructorItem> = (props) => {
  const history = useHistory();
  const location = useLocation();
  const {ingredient, index, moveComponent} = props;
  const {name, price, image} = ingredient;

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'ingredientMove',
    hover(item:{index: number}, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset === null ? 0 : clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveComponent(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const dispatch = useDispatch();

  const handleOpenModal = (ingredientId:string) => {
    return () => {
      history.push({
        pathname: `/ingredients/${ingredientId}`,
        state: {background: location}
      });
    }
  };
  const handleRemoveIngredient = (index:number) => {
    return () => {
      dispatch(removeIngredient({index}));
    };
  }

  const [, drag] = useDrag({
    type: 'ingredientMove',
    item: () => {
      return {index};
    },
  });
  drag(drop(ref));

  return (
    <div className={burgerConstructorItemStyles["burger-constructor-list-item"]} ref={ref}>
      <DragIcon type="primary"/>
      <div className={burgerConstructorItemStyles["burger-constructor-list-item-inner"]}
           onClick={handleOpenModal(ingredient._id)}>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={handleRemoveIngredient(index)}
        />
      </div>
    </div>
  );
}