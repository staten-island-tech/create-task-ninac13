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
          `<div class="card w-1/4 pb-20 pt-12 h-96 border-4 border-base-100 rounded-lg border-double hover:w-1/4 duration-700 mx-5 my-5 min-w-64 shadow-md bg-base-300 hover:bg-base-100 hover:outline-dotted outline-accent focus:ring focus:ring-base-content">
            <p class="mb-15 text-xl character-name text-center font-serif text-neutral">${meal.strMeal}</p>
            <div class="flex justify-center text-neutral">
              <img src="${meal.strMealThumb}" alt="" class="w-2/3 h-3/4 rounded-lg border-double border-4 border-base-100"></img>
            </div>
            <div class="flex justify-center">
              <button class="btn btn-secondary w-52 hover:w-56 hover:h-16 hover:font-extrabold duration-700 font-normal mt-5 mx-5 font-serif add-to-cart hover:outline-dotted outline-accent" meal-name="${meal.strMeal}" meal-category-name="${categoryName}">Add To Cart</button>
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
      CART.push({mealName: mealName, mealCategoryName: mealCategoryName,});
      DOMSelectors.orderSummary.insertAdjacentHTML(
        `beforeend`,
        `<div class="cart-item w-full p-4 flex justify-between items-center border-b border-gray-300">
            <div>
              <p class="text-lg font-extrabold font-serif">Pending: </p>
              <p class="text-lg font-serif">${mealName}</p>
              <p class="text-sm font-serif text-primary-content">Category: ${mealCategoryName}</p>
            </div>
            <button class="delete-btn btn btn-error w-24 px-6 ml-4" data-meal-name="${mealName}" data-meal-category="${mealCategoryName}">Delete From Cart</button>
          </div>
        `
      );
      DOMSelectors.deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButton();
    });
  });
}

function deleteButton(){
  const deleteButtons = DOMSelectors.deleteButtons;
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const mealName = button.getAttribute("data-meal-name");
      const mealCategoryName = button.getAttribute("data-meal-category");
      for (let i = 0; i < CART.length; i++) {
        if (CART[i].mealName === mealName && CART[i].mealCategoryName === mealCategoryName) {
          CART.splice(i, 1);
          button.parentElement.remove(); 
          return;
        }
        else{
          return;
        }
      }
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
      DOMSelectors.orderSummary.innerHTML = "";
      let orderSummary = "";

      for (let i=0; i<CART.length; i++){
        const meal = CART[i];
        orderSummary += `<p> ${i+1}. Meal: ${meal.mealName}<br> Category: ${meal.mealCategoryName}<br><br></p>`;
      }

      DOMSelectors.orderSummary.insertAdjacentHTML(
        `beforeend`,
        `<p class="text-xl character-name text-center font-serif text-neutral">${orderSummary}</p>`
      );
    }
  })
}

function clearCartItems(){
  const clearCartItemsButton = DOMSelectors.clearCart;
  clearCartItemsButton.addEventListener("click", function(){
    if (CART.length===0 && DOMSelectors.orderSummary.innerHTML === ""){
      alert("The cart is already cleared.");
    }
    else{
      DOMSelectors.orderSummary.innerHTML = "";
      CART.length=0;
    }
  })
}
clearCartItems();

submitButtonClicked();

function buttonChangeColor(){
  DOMSelectors.allButtons.forEach(button => {
    button.addEventListener('click', () => {
      DOMSelectors.allButtons.forEach((btn) => {
        btn.classList.remove('btn-active');
      });
      button.classList.add('btn-active');
    })
  })
}
buttonChangeColor();