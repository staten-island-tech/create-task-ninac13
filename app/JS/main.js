import '../CSS/style.css';
import { DOMSelectors } from "./domselectors";

const URL = "https://www.themealdb.com/api/json/v1/1/"; //use this to add on categories!!

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
        showMeals(starterData, DOMSelectors.starter);
        showMeals(vegetarianData, DOMSelectors.vegetarian);
        showMeals(seafoodData, DOMSelectors.seafood);
        showMeals(pastaData, DOMSelectors.pasta);
        showMeals(chickenData, DOMSelectors.chicken);
        showMeals(porkData, DOMSelectors.pork);
        showMeals(beefData, DOMSelectors.beef);
        showMeals(dessertData, DOMSelectors.dessert);
    }
  } catch (error) {
    alert ("There is no agent found");
    console.log (error);
  }
}

fetchMealsFromCategory(URL);

//general function for showing meals onto screen
function showMeals(generalMealData, specificButton){
  specificButton.addEventListener("click", function(){
    DOMSelectors.cardsContainer.innerHTML = ""; //clear
    generalMealData.meals.forEach(meal => {
      DOMSelectors.cardsContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="w-1/4 py-28 border-4 border-base-100 rounded-lg border-double hover:w-2/5 duration-700 mx-5 my-5 min-w-64 shadow-md bg-base-content hover:bg-primary active:bg-warning focus:outline-none focus:ring focus:ring-base-content">
          <p class="mb-20 text-xl character-name text-center font-serif text-neutral">${meal.strMeal}</p>
          <div class="flex justify-center text-neutral">
            <img src="${meal.strMealThumb}" alt= "" class="w-2/3 h-3/4 rounded-lg border-double border-4 border-base-100"></img>
          </div>
        </button>`
      )
    });
  }
)}

function cardClicked(){
  
}