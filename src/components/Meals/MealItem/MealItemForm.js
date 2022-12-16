
import React, {useRef, useState} from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitItemHandler = event => {
    event.preventDefault()
    const amountEntered = amountInputRef.current.value;
    const amountEnteredNumber = +amountEntered;

    if (
      amountEntered.trim().length === 0 || 
      amountEnteredNumber < 1 ||
      amountEnteredNumber  > 5
      ) {
      setAmountIsValid(false);
      return
    }

    props.onAddToCart(amountEnteredNumber);
  }
  return (
    <form className={classes.form} onSubmit={submitItemHandler}>
        <Input 
            ref={amountInputRef}
            label="Amount" 
            input={{
              id: 'amount',
              type: 'number',
              min: '1',
              max: '5',
              step: '1',
              defaultValue: '1'
        }}/>
        <button type='submit'> + Add </button>
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  )
}

export default MealItemForm