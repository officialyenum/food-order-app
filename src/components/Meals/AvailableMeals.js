import React from 'react';
import classes from './AvailableMeals.module.css';
import { DUMMY_MEALS } from '../../data/dummy-meals';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const meals = DUMMY_MEALS.map((meal) => (
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
            <ul>
                {meals}
            </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals