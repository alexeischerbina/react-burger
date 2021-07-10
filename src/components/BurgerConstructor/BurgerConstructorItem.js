import { useRef } from 'react';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';

import { useDispatch } from 'react-redux';

import { showIngredientInfo } from '../../services/slices/index';
import { removeIngredient } from '../../services/slices/burgerConstructor';

import { useDrag, useDrop } from 'react-dnd';

function BurgerConstructorItem(props) {
  const { ingredient, index, moveComponent } = props;
  const { name, price, image } = ingredient;

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'ingredientMove',
    collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        };
    },
    hover(item, monitor) {
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
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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

  const handleOpenModal = (ingredient) => {
    return () => {
      dispatch(showIngredientInfo({ ingredient }));
    }
  };
  const handleRemoveIngredient = (index) => {
    return (e) => {
      e.stopPropagation();
      dispatch(removeIngredient({ index }));
    };
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredientMove',
    item: () => {
        return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <>
      <DragIcon type="primary"/>
      <div className={burgerConstructorStyles["burger-constructor-list-item-inner"]} onClick={handleOpenModal(ingredient)} ref={ref} data-handler-id={handlerId} >
        <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={handleRemoveIngredient(index)}
        />
      </div>
    </>
  );
}

export default BurgerConstructorItem;
