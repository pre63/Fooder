import { useState } from 'preact/hooks'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { data } from './data'

const Home = () => {
  const [value, setValue] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [yourMeals, setYourMeals] = useState([])
  const meal = data[value]
  const styles = {
    backgroundImage: `url(${meal.image})`,
    color: 'red',
  }

  const swipeAction = add => () => (
    setValue(
      value < data.length - 1
        ? value + 1
        : (setShowResult(true), 0)),
    console.info('swipe action triggered'),
    add && setYourMeals([...yourMeals, meal]))

  return (
    showResult
      ? yourMeals.length == 0
        ? <p class="center no-meals">You like no meals, I'm sorry!</p>
        : <><h1 class="center">Your Meals</h1>
          <ul class="meal-list">
            {yourMeals.map(m => (<li> <img class="product-thumb" src={m.image} />
              <span>{m.name}</span></li>))}
          </ul>
        </>
      : <>
        <SwipeableList>
          <SwipeableListItem
            swipeLeft={{
              content: <div class='red'><svg xmlns="http://www.w3.org/2000/svg" fill="white" alignmentBaseline="middle" preserveAspectRatio="xMidYMin" viewBox="0 0 24 24" ><path d="M0 0h24v24H0z" fill="none" /><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg></div>,
              action: swipeAction(false)
            }}
            swipeRight={{
              content: <div class='green'><svg xmlns="http://www.w3.org/2000/svg" fill="white" alignmentBaseline="middle" preserveAspectRatio="xMidYMin" viewBox="0 0 24 24" ><path d="M0 0h24v24H0z" fill="none" /><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" /></svg></div>,
              action: swipeAction(true)
            }}
          >
            <div class="full">
              <div class="product-image" style={styles} ></div>
              <div class="details">
                <h2>{meal.name}</h2>
                <p>by <b>{meal.vendor}</b></p>
                <p dangerouslySetInnerHTML={{ __html: JSON.parse(meal.body).replace('"', '') }}></p>
                <h3>Meal Details</h3>
                <ul>{meal.tags.split(',').map(t => <li class="tag">{t}</li>)}</ul>
              </div>
            </div>
          </SwipeableListItem>
        </SwipeableList >
      </>
  )
}

export default Home
