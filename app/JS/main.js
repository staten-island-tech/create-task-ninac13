import '../CSS/style.css';
import { DOMSelectors } from "./domselectors";

const URL = "https://www.themealdb.com/api/json/v1/1/"; //use this to add on categories!!

async function fetchMealsFromCategory(URL) {
  try {
    const mealsInCategoryURL = URL.concat("filter.php?c=breakfast"); //right now its fetching only breakfast, make it so its interchangeable and all meals can be got
    const response = await fetch(mealsInCategoryURL);
    if (response.status != 200){
        throw new Error(response);  
    }
    else{
        const mealsInCategoryData = await mealsInCategoryURL.json();
        //call function here
    }
  } catch (error) {
    alert ("There is no agent found");
    console.log ("error");
  }
}

//SHOULD COMBINE THIS FUNCTION W THE ONE ON TOP SO THE showcards function can be called in one piece!!
async function fetchMealData(URL) {
  try {
    const mealURL = URL.concat("lookup.php?i=52772"); //right now its fetching a specific meal, make it so its interchangeable and all meals can be fetched based on the card id
    const response = await fetch(mealURL);
    if (response.status != 200){
        throw new Error(response);
    }
    else{
        const mealData = await mealURL.json();
        //call function here
    }
  } catch (error) {
    alert ("There is no agent found");
    console.log ("error");
  }
}

//general function for showing cards onto screen
function showcards(generalMealData, specificMealData){
  generalMealData.forEach((meal) => {
    DOMSelectors.cardsContainer.insertAdjacentHTML(
      `beforeend`,
      `<div class="card">
        <h1 class="card-meal-name">${meal.strMeal}</h1>
        <img src="${meal.strMealThumb} alt= "" class= "card-meal-image"></img> 
      </div>`
      //add specificmealdata to each card (ingredients list so ppl can look for allergies)
    )
  });
}