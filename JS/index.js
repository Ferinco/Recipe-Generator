const frontPage = document.getElementById("front-page")
const preLoader = document.getElementById("preloader")
frontPage.style.display = "none"
window.addEventListener("load",()=>{
frontPage.style.display = "block"
preLoader.style.display = "none"
})