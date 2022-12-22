import React, {useRef, useState} from 'react'
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputIsValid, setFormInputIsValid] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
    })
    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostal = postalRef.current.value;
        const enteredCity = cityRef.current.value;
        console.log({
            name: nameRef.current.value,
            street: streetRef.current.value,
            postal: postalRef.current.value,
            city: cityRef.current.value,
            enteredName,
            enteredStreet,
            enteredPostal,
            enteredCity
        })

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputIsValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })
        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalIsValid && enteredStreetIsValid;
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        })
    }
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputIsValid.name ? '':classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef}/>
                {!formInputIsValid.name && <p>Please enter a valid name!</p>}
            </div>

            <div className={`${classes.control} ${formInputIsValid.street ? '':classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef}/>
                {!formInputIsValid.street && <p>Please enter a valid street!</p>}
            </div>

            <div className={`${classes.control} ${formInputIsValid.postal ? '':classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef}/>
                {!formInputIsValid.postal && <p>Please enter a valid postal code!</p>}
            </div>

            <div className={`${classes.control} ${formInputIsValid.city ? '':classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputIsValid.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClose}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout