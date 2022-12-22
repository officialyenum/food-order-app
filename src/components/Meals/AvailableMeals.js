import React, { useState, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const transformMeal = (meal) => {
        const loadedMeals = [];
        for (const mealKey in meal){
            loadedMeals.push(
                {
                    id: mealKey, 
                    name: meal[mealKey].name,
                    description: meal[mealKey].description,
                    price: meal[mealKey].price,
                }
            )
        }
        setMeals(loadedMeals);
    }

    const {isLoading, error, sendRequest} = useHttp();
    useEffect(() => {
        sendRequest({url: 'https://hook-http-f2866-default-rtdb.firebaseio.com/meals.json'}, transformMeal);
    
    }, [sendRequest])
    
    const newMeals = meals.map((meal) => (
        <MealItem 
            key={meal.id} 
            id={meal.id}
            name={meal.name} 
            description={meal.description}
            price={meal.price}
            />
    ));
    return (
        <section className={classes.meals}>
            <Card>
                {error && <p>{error}</p>}
                {isLoading && <p>Loading Meals...</p>}
                <ul>
                    {newMeals}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals