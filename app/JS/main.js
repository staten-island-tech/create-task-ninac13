import '../CSS/style.css';
import { DOMSelectors } from "./domselectors";

const URL = "https://www.themealdb.com/api/json/v1/1/";
const CART = [];

async function fetchMealsFromCategory(URL) {
  try {
    const starterResponse = await fetch(`${URL}filter.php?c=starter`);
    const vegetarianResponse = await fetch(`${URL}filter.php?c=vegetarian`);
    const seafoodResponse = await fetch(`${URL}filter.php?c=seafood`);
    const pastaResponse = await fetch(`${URL}filter.php?c=pasta`);
    const chickenResponse = await fetch(`${URL}filter.php?c=chicken`);
    const porkResponse = await fetch(`${URL}filter.php?c=pork`);
    const beefResponse = await fetch(`${URL}filter.php?c=beef`);
    const dessertResponse = await fetch(`${URL}filter.php?c=dessert`);
    if (starterResponse.status != 200 || vegetarianResponse.status != 200 || seafoodResponse.status != 200 || pastaResponse.status != 200 || chickenResponse.status != 200 || porkResponse.status != 200 || beefResponse.status != 200 || dessertResponse.status != 200 ){
        throw new Error("One or more responses did not work");  
    }
    else{
        const starterData = await starterResponse.json();
        const vegetarianData = await vegetarianResponse.json();
        const seafoodData = await seafoodResponse.json();
        const pastaData = await pastaResponse.json();
        const chickenData = await chickenResponse.json();
        const porkData = await porkResponse.json();
        const beefData = await beefResponse.json();
        const dessertData = await dessertResponse.json();
        //call functions underneath:\
        showMeals(starterData, DOMSelectors.starter, "Starter");
        showMeals(vegetarianData, DOMSelectors.vegetarian, "Vegetarian");
        showMeals(seafoodData, DOMSelectors.seafood, "Seafood");
        showMeals(pastaData, DOMSelectors.pasta, "Pasta");
        showMeals(chickenData, DOMSelectors.chicken, "Chicken");
        showMeals(porkData, DOMSelectors.pork, "Pork");
        showMeals(beefData, DOMSelectors.beef, "Beef");
        showMeals(dessertData, DOMSelectors.dessert, "Dessert");
    }
  } catch (error) {
    alert ("There is no agent found");
    console.log (error);
  }
}

fetchMealsFromCategory(URL);

function showMeals(generalMealData, specificButton, categoryName) {
  specificButton.addEventListener("click", function () {
    DOMSelectors.cardsContainer.innerHTML = "";
    generalMealData.meals.forEach((meal) => {
      DOMSelectors.cardsContainer.insertAdjacentHTML(
        `beforeend`,
        `<div class="w-1/5 py-28 border-4 border-base-100 rounded-lg border-double hover:w-1/4 duration-700 mx-5 my-5 min-w-64 shadow-md bg-primary hover:bg-secondary hover:outline-dotted outline-accent focus:ring focus:ring-base-content">
          <p class="mb-20 text-xl character-name text-center font-serif text-neutral">${meal.strMeal}</p>
          <div class="flex justify-center text-neutral">
            <img src="${meal.strMealThumb}" alt="" class="w-2/3 h-3/4 rounded-lg border-double border-4 border-base-100"></img>
          </div>
          <div class="flex justify-center">
            <button class="btn btn-secondary hover:w-52 duration-1000 btn-outline mt-5 mx-5 font-serif mb-3 add-to-cart" meal-name="${meal.strMeal}" meal-category-name="${categoryName}">Add To Cart</button>
          </div>
        </div>`
      );
    });

    DOMSelectors.addToCartButtons = document.querySelectorAll(".add-to-cart");
    cardButtonClicked();
  })
}

function cardButtonClicked() {
  DOMSelectors.addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const mealName = button.getAttribute("meal-name");
      const mealCategoryName = button.getAttribute("meal-category-name");
      CART.push(`Meal Name: ${mealName}, Category: ${mealCategoryName}`);
      console.log(`Added to cart: ${mealName}`);
      console.log(`Added to cart: ${mealCategoryName}`);
      console.log(`Cart:`, CART);
    });
  });
}

function submitButtonClicked(){
  const showCartItemsButton = DOMSelectors.showCartItemsButton;
  DOMSelectors.orderSummary.innerHTML = "";

  showCartItemsButton.addEventListener("click", function(){
    if (CART.length === 0) {
      alert("The cart is empty.");
    }
    else{
      let orderSummary = "";

      for (let i=0; i<CART.length; i++){
        const meal = CART[i];
        orderSummary += `<p> Meal: ${meal.mealName} Category: ${meal.mealCategoryName}</p>`;
      }

      DOMSelectors.orderSummary.insertAdjacentHTML(
        `beforeend`,
        `<p class="text-xl character-name text-center font-serif text-neutral">${orderSummary}</p>`
      );
    }
  })
}

submitButtonClicked();