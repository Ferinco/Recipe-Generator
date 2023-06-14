const frontPage = document.getElementById("front-page")
const preLoader = document.getElementById("preloader")
const result = document.getElementById("result")
const searchBtn = document.getElementById("search-btn")
const searchResults = document.getElementById("search-results")
const recipeGetter = document.getElementById("recipe-getter")
notFound = document.createElement("p")
notFound.id = "not-found"
notFound.innerHTML = `sorry, couldn't find a match or your search`
document.querySelector(".results-header").style.display = "none"
searchResults.style.display = "none"
const foods = document.querySelectorAll('.foods-body-items-item');
const foodsRecipe = document.querySelector(".foods")
const recipeResults = document.querySelector(".recipe-results")
var recipe = document.querySelector(".recipe")
recipe.style.display = "none"
document.getElementById("result-preloader").style.display ="none"

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    
    document.querySelector(".banner").style.display = "none";
    document.querySelector(".results-header").style.display = "flex";
    let searchedItem = document.getElementById("search-input").value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchedItem}`)
    .then(response => response.json())
    .then(data =>{
        if(data.meals){
            data.meals.forEach(meal => {
                notFound.remove()
                const resultMeal = document.createElement("div")
                resultMeal.className = "result-meal"
                resultMeal.dataset.id = `${meal.idMeal}`
                resultMeal.innerHTML = `
                <div class="result-meal-image">
                <img src="${meal.strMealThumb}" alt="" />
                </div>
                <div class="result-meal-name"><h3>${meal.strMeal}</h3></div>
                <div class="result-meal-button"><button class="details-btn" type= "submit" id="recipe-getter">details</button></div>
                `
                result.appendChild(resultMeal);
                searchResults.appendChild(result);
                searchResults.style.display = "block";
                result.style.height = "auto";

    });
 
}
else{
    document.querySelector(".results-header").style.display = "none"

result.appendChild(notFound)
searchResults.style.display = "block"
searchResults.appendChild(result)
result.style.height = "100vh"
result.style.justifyContent = "center"
result.style.alignItems = "center"

}
})
})
result.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("details-btn")) {
      let resultMeal = e.target.parentElement.parentElement;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${resultMeal.dataset.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.meals) {
            const meal = data.meals[0];
            document.getElementById("result-preloader").style.display ="flex"
            result.style.filter = "blur(4px)"
            setTimeout(() => {
              displayRecipe(meal);
              document.getElementById("result-preloader").style.display ="none"
              result.style.filter = "blur(0)"
            }, 2000);
          }
        })
        .catch(error => {
          console.log("Error:", error);
        });
    }
  }); 

  function displayRecipe(meal) {
    // const recipe = document.createElement("div");
    // recipe.className = "recipe";
    recipe.innerHTML = `
    <div class="recipe-button">
    <button id="close-recipe" onclick="cancelRecipe()" class = "fa fa-times"></button>
    </div>
    <div class="recipe-body">
    <h3>${meal.strMeal}</h3>
    <p>Category: <span>${meal.strCategory}</span></p>
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    </div>`;
    recipe.style.display = "flex"
    document.getElementById("front-page").style.filter = "blur(4px)"
    
    // searchResults.appendChild(recipe);
    // recipe.innerHTML = ""
  } 
function cancelRecipe() {
    recipe.style.display = "none"
    document.getElementById("front-page").style.filter = "blur(0)"
  }

  function displayFood(meal) {
    recipe.innerHTML = `
      <div class="recipe-button">
        <button id="close-recipe" onclick="cancelRecipe()" class = "fa fa-times"></button>
      </div>
      <div class="recipe-body">
        <h3>${meal.strMeal}</h3>
        <p>Category: <span>${meal.strCategory}</span></p>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
      </div>`;
      recipe.style.display = "flex"
  
  } 
  const foodsPreloader =document.getElementById("foods-preloader")
  foodsPreloader.style.display = "none"
// window.onload = displayFoods=()=>{    
    foods.forEach((food) => {   
            
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${food.dataset.id}`)
        .then(response => response.json())
        .then(data =>{
        if(data.meals){
            const foodLink = document.createElement("a");
            food.dataset.id = `${food.idMeal}`
            foodLink.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt=""/>`
            food.appendChild(foodLink)
            food.addEventListener("click",(e)=>{
              meal = data.meals[0]
              foodsPreloader.style.display = "flex"
              document.querySelector(".foods-body").style.filter = "blur(4px)"
              
              setTimeout(() => {
                displayFood(meal)
                foodsPreloader.style.display = "none"
                document.getElementById("front-page").style.filter = "blur(4px)"
                document.querySelector(".foods-body").style.filter = "blur(0)"
              }, 2000);
            })
           
        }
    })   
});
// }
frontPage.style.display = "none"
window.addEventListener("load",()=>{
frontPage.style.display = "block"
preLoader.style.display = "none"
})
closeResults=()=>{
 location.reload()
}
