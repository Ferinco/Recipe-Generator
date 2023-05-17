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
    document.querySelector(".banner").style.display = "none"
    document.querySelector(".results-header").style.display = "flex"
    e.preventDefault()
let searchedItem = document.getElementById("search-input").value.trim()
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchedItem}`)
.then(response => response.json())
.then(data =>{
console.log(data)
if(data.meals){
    data.meals.forEach(meal => {
    const resultMeal = document.createElement("div")
    resultMeal.className = "result-meal"
        resultMeal.innerHTML = `
          <div class="result-meal-image">
            <img src="${meal.strMealThumb}" alt="" />
          </div>
          <div class="result-meal-name"><h3>${meal.strMeal}</h3></div>
          <div class="result-meal-button"><button>details</button></div>
        `
        
        result.appendChild(resultMeal)
        searchResults.appendChild(result)
    });
}
})
.catch(error =>{console.log(error)})
})
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