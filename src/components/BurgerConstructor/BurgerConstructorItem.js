import { useRef } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css';

import { useDispatch } from 'react-redux';

import { showIngredientInfo } from '../../services/slices/index';
import { removeIngredient } from '../../services/slices/burgerConstructor';

import { useDrag, useDrop } from 'react-dnd';

function BurgerConstructorItem(props) {
  const { ingredient, index, moveComponent } = props;
  const { name, price, image } = ingredient;

  const ref = useRef(null);

  const [ , drop] = useDrop({
    accept: 'ingredientMove',
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

  const [ , drag] = useDrag({
    type: 'ingredientMove',
    item: () => {
        return { index };
    },
  });
  drag(drop(ref));

  return (
    <div className={burgerConstructorItemStyles["burger-constructor-list-item"]}  ref={ref}>
      <DragIcon type="primary"/>
      <div className={burgerConstructorItemStyles["burger-constructor-list-item-inner"]} onClick={handleOpenModal(ingredient)} >
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

const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  moveComponent: PropTypes.func.isRequired
};

export default BurgerConstructorItem;
