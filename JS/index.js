const frontPage = document.getElementById("front-page")
const preLoader = document.getElementById("preloader")
const menuBar = document.getElementById("menu-bar")
const cancelBar = document.getElementById("cancel-bar")
const result = document.getElementById("result")
const searchBtn = document.getElementById("search-btn")
const searchResults = document.getElementById("search-results")
const recipeGetter = document.getElementById("recipe-getter")
document.querySelector(".results-header").style.display = "none"
// cancelBar.style.display = "none"
// searchResults.style.display = "none"

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    
    document.querySelector(".banner").style.display = "none";
    document.querySelector(".results-header").style.display = "flex";
    let searchedItem = document.getElementById("search-input").value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchedItem}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.meals){
            data.meals.forEach(meal => {
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

    });
 
}
else{
    document.querySelector(".results-header").style.display = "none"
    notFound = document.createElement("p")
    notFound.id = "not-found"
notFound.innerHTML = `sorry, couldn't find a match or your search`
result.appendChild(notFound)
searchResults.style.display = "block"
searchResults.appendChild(result)
result.style.height = "100vh"
result.style.justifyContent = "center"
result.style.alignItems = "center"

}
})
.catch(error =>{console.log(error)})
})



// result.addEventListener("click",(e)=>{
//     e.preventDefault()
//     if (e.target.classList.contains("details-btn")) {
//                 let mealItem = e.target.parentElement.parentElement;
//                 fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//                 .then(response =>response.json())
//                 .then(data =>{
//                     console.log(data);
//                     if (data.meals) {
//                         displayRecipe=(meal)=>{
//                             meal[0] = meal;
//                             recipe = document.createElement("div");
//                             recipe.className = "recipe";
//                             recipe.innerHTML = `
//                             <div class="recipe-button">
//                             <button id="close-recipe" onclick = "cancelRecipe()"></button>
//                             </div>
//                             <div class="recipe-body">
//                             <h3>${meal[0].strMeal}</h3>
//                             <p>Category</p>
//                             <h3>Instructions</h3>
//                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, officiis. Consequatur deleniti mollitia vitae culpa aliquid tenetur expedita optio? Odio enim ipsam veritatis. Excepturi et consectetur eum, aut quia laboriosam quisquam ad omnis cupiditate deleniti blanditiis vel, reprehenderit ullam soluta.</p>
//                             </div>`
//                             console.log(recipe)
//                             searchResults.appendChild(recipe)
//                             console.log(searchResults)
//                         }
//                     }
//                 })
                    
//                 }
// })
result.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("details-btn")) {
      let resultMeal = e.target.parentElement.parentElement;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${resultMeal.dataset.id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.meals) {
            const meal = data.meals[0];
            displayRecipe(meal);
          }
        })
        .catch(error => {
          console.log("Error:", error);
        });
    }
  });
  
  function displayRecipe(meal) {
    const recipe = document.createElement("div");
    recipe.className = "recipe";
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
  
    searchResults.appendChild(recipe);
  }
  
function cancelRecipe() {
    // Define the functionality to be executed when the button is clicked
    // For example, you can remove the recipe from the DOM:
    const recipe = document.querySelector(".recipe");
    recipe.remove();
  }
  
  

 

window.onload = displayFoods=()=>{

    const divs = document.querySelectorAll('.foods-body-items-item');
    divs.forEach(food => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${food.dataset.id}`)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        if(data.meals){
            const foodLink = document.createElement("a");
            food.dataset.id = `${food.idMeal}`
            foodLink.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt=""/>`
            food.appendChild(foodLink)
        }
    })
    
    
});
}


frontPage.style.display = "none"
window.addEventListener("load",()=>{
frontPage.style.display = "block"
preLoader.style.display = "none"
})
menuBar.addEventListener("click",()=>{
    menuBar.style.display= "none"
    cancelBar.style.marginTop = "-10px"
cancelBar.style.display = "flex"
})
cancelBar.addEventListener("click",()=>{
    menuBar.style.display = "flex"
    cancelBar.style.display = "none"
})