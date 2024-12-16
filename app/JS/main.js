import '../CSS/style.css';
import { DOMSelectors } from "./domselectors";

const URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c="; //use this to add on categories!!

async function fetchData(URL) {
  try {

    const response = await fetch(breakfast);
    if (response.status != 200){
        throw new Error(response);  
    }
    else{
        const categoriesData = await categories.json();
        //call function here
    }
  } catch (error) {
    alert ("There is no agent found");
    console.log ("error");
  }
}