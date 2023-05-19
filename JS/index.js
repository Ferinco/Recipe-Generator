const frontPage = document.getElementById("front-page")
const preLoader = document.getElementById("preloader")
const menuBar = document.getElementById("menu-bar")
const cancelBar = document.getElementById("cancel-bar")
const result = document.getElementById("result")
const searchBtn = document.getElementById("search-btn")
const searchResults = document.getElementById("search-results")
document.querySelector(".results-header").style.display = "none"
// cancelBar.style.display = "none"


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
    document.querySelector(".results-header").style.display = "none"
    data.meals.forEach(meal => {
        searchResults.innerHTML = ""
    const resultMeal = document.createElement("div")
    resultMeal.className = "result-meal"
    resultMeal.dataset.id = `${meal.idMeal}`
        resultMeal.innerHTML = `
          <div class="result-meal-image">
            <img src="${meal.strMealThumb}" alt="" />
          </div>
          <div class="result-meal-name"><h3>${meal.strMeal}</h3></div>
          <div class="result-meal-button"><button class="details-btn" onclick = "getMealRecipe()">details</button></div>
        `
        
        result.appendChild(resultMeal)
        searchResults.appendChild(result)
    });
}
else{
    document.querySelector(".results-header").style.display = "none"
    notFound = document.createElement("p")
    notFound.id = "not-found"
notFound.innerHTML = `sorry, couldn't find a match or your search`
result.appendChild(notFound)
searchResults.appendChild(result)
result.style.height = "100vh"
result.style.justifyContent = "center"
result.style.alignItems = "center"

}
})
.catch(error =>{console.log(error)})
})

function getMealRecipe(e){
    // e.preventDefault();
    // if (e.target.classList.contains("details-btn")) {
        let resultMeal = document.querySelector(".result-meal")
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${resultMeal.dataset.id}`)
        .then(response =>response.json())
        .then(data =>{
            console.log(data);
            let meal = meal[0];
            recipe = document.createElement("div")
            recipe.className = "recipe"
            recipe.innerHTML = `
            <div class="recipe-button">
            <button id="close-recipe"></button>
            </div>
            <div class="recipe-body">
            <h3>${meal.strMeal}</h3>
            <p>Category</p>
            <h3>Instructions</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, officiis. Consequatur deleniti mollitia vitae culpa aliquid tenetur expedita optio? Odio enim ipsam veritatis. Excepturi et consectetur eum, aut quia laboriosam quisquam ad omnis cupiditate deleniti blanditiis vel, reprehenderit ullam soluta.</p>
            </div>`
            searchResults.appendChild(recipe)
            console.log(recipe)
            
        })
    // }
}
window.onload = displayFoods=()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52773`)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        if(data.meals){
            const foodLink = document.createElement("a");
            foodLink.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt=""/>`
            document.getElementById("first").appendChild(foodLink)
        }
    })
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