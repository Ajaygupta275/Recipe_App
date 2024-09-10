const searchBox=document.querySelector(".searchBox");
const searchBtn=document.querySelector(".searchBtn");
const recipeContainer=document.querySelector(".recipe-container");
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');
const  fetchRecipes= async (query)=>{
    
    recipeContainer.innerHTML="<h2>Fetchin Recipes... </h2>";
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json();
    // console.log(response.meals[0]);
      recipeContainer.innerHTML=" ";
      response.meals.forEach(meal=>{
        //   console.log(meal);
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
           <img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3>
           <p><span>${meal.strArea}</span></p>
           <p>Belongs to <span>${meal.strCategory}</span></p>
        
           `


           const button=document.createElement('button');
           button.textContent="View Recipe";
           recipeDiv.appendChild(button);

        //    Adding EventListener to recipe button
           button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
      });
}
// Function to fetch ingradient and measure
  const fetchIngredients=(meal)=>{
    //  console.log(meal);
    let ingradientList="";
    for (let i=1;i<=20;i++){
      const ingradient=meal[`strIngradient${i}`];
      if(ingradient){
        const measure=meal[`strMeasure${i}`];
        ingradientList += `<li>
          ${measure} ${ingradient}
        </li>`
      }
      else{
        break;
      }
    }
    return ingradientList;
  }

const openRecipePopup=(meal)=>{
  recipeDetailsContent.innerHTML=`
     <h2>${meal.strMeal} </h2>
     <h3>Ingredent</h3>
     <ul class="ingradient">${fetchIngredients(meal)}</ul>

     <div>
         <h3>Instruction:</h3>
          <p class="recipeInstructions">${meal.strInstructions}</p>
         </div>
     `
     recipeDetailsContent.parentElement.style.display="block";


}


recipeCloseBtn.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display="none";

});

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});