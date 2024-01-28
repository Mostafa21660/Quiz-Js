// To keep the nav nar closed

closeSideNav();

$('#searchContainer').hide();
$('#contact').hide();

getRecipes();

// Function to open side nav
function openSideNav() {
$(".side-nav-menu").css("left", "0");
$(".side-nav-menu .links li").css("top", "0");
}

// Function to close side nav
function closeSideNav() {
const sideNavWidth = $(".nav-tab").outerWidth();
$(".side-nav-menu").css("left", `-${sideNavWidth}px`);
$(".side-nav-menu .links li").css("top", "300px"); // Slide links back down
}

// Function to show search inputs and close side nav
function showSearchInputs() {
const rowContainer = $("#rowData");
rowContainer.empty(); // Clear existing meals
console.log("Showing search inputs");
$('#searchContainer').show();
}

// Function to get categories and close side nav
function getCategories() {
    $('#searchContainer').hide();

    getMealCategories();
    console.log("Getting categories");
}

// Function to get area and close side nav
function getArea() {
    $('#searchContainer').hide();

    getAreas();
    console.log("Getting area");
}

// Function to get ingredients and close side nav
function getIngredients() {
console.log("Getting ingredients");
}

// Function to fetch and display meals
async function getRecipes() {


    // List of 20 popular meals
const mealList = [
    "Burger",
    "Pizza",
    "Pasta",
    "Salad",
    "Sushi",
    "Tacos",
    "Steak",
    "Chicken",
    "Curry",
    "Soup",
    "Sandwich",
    "Shrimp",
    "Rice",
    "Burrito",
    "Lasagna",
    "Noodles",
    "Fajita",
    "Sushi",
    "Sashimi",
    "Wrap",
    ];
const rowContainer = $("#rowData");

for (let i = 0; i < mealList.length; i++) {
try {
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealList[i]}`);
const data = await response.json();

if (data.meals && data.meals.length > 0) {
  const meal = data.meals[0];
  const mealElement = `
    <div class="col-md-3">
      <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
    </div>
  `;

  const $mealElement = $(mealElement);
  $mealElement.find('.meal-layer').hide(); // Initially hide meal layer

  // Add click event to show detailed view
  $mealElement.click(function() {
    // Hide other meal elements
    $('.meal').not(this).hide();

    // Display detailed view
    const detailedView = `
      <div class="row py-5 g-4" id="detailedView">
        <div class="col-md-4">
          <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
          
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${generateIngredientsList(meal)}
          </ul>
          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${generateTagsList(meal)}
          </ul>
          <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
          <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          <button class="btn btn-danger close-btn z-ind">Close</button>
        </div>
      </div>
    `;

    // Append detailed view to the row container
    rowContainer.append(detailedView);

    // Add click event to close button
    $('.close-btn').click(function() {
      // Show all meal elements
      $('.meal').show();
      // Remove detailed view
      $('#detailedView').remove();
    });
  });

  rowContainer.append($mealElement);
}
} catch (error) {
console.error(`Error fetching meal ${mealList[i]}: ${error.message}`);
}
}
}

// Function to generate ingredients list HTML
function generateIngredientsList(meal) {
let ingredientsList = '';
for (let i = 1; i <= 20; i++) {
const ingredient = meal[`strIngredient${i}`];
const measure = meal[`strMeasure${i}`];
if (ingredient && measure) {
ingredientsList += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
}
}
return ingredientsList;
}

// Function to generate tags list HTML
function generateTagsList(meal) {
const tags = meal.strTags;
if (tags) {
return `<li class="alert alert-info m-2 p-1">${tags}</li>`;
} else {
return ''; // Return an empty string if no tags
}
}


// Function to fetch and display meals based on search by name
async function searchByName(name) {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const data = await response.json();
  
      if (data.meals) {
        displayMeals(data.meals);
      }
    } catch (error) {
      console.error(`Error searching by name: ${error.message}`);
    }
  }
  
  // Function to fetch and display meals based on search by first letter
  async function searchByFLetter(letter) {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await response.json();
  
      if (data.meals) {
        displayMeals(data.meals);
      }
    } catch (error) {
      console.error(`Error searching by first letter: ${error.message}`);
    }
  }
  
  // Function to display meals
  function displayMeals(meals) {
    const rowContainer = $("#rowData");
  
    for (let i = 0; i < meals.length; i++) {
      const meal = meals[i];
      const mealElement = `
        <div class="col-md-3">
          <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        </div>
      `;
  

      const $mealElement = $(mealElement);
    $mealElement.find('.meal-layer').hide(); // Initially hide meal layer
  
    // Add click event to show detailed view
    $mealElement.click(function() {
      // Hide other meal elements
      $('.meal').not(this).hide();
  
      // Display detailed view
      const detailedView = `
        <div class="row py-5 g-4" id="detailedView">
          <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
            
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${generateIngredientsList(meal)}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${generateTagsList(meal)}
            </ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            <button class="btn btn-danger close-btn z-ind">Close</button>
          </div>
        </div>
      `;
  
      // Append detailed view to the row container
      rowContainer.append(detailedView);
  
      // Add click event to close button
      $('.close-btn').click(function() {
        // Show all meal elements
        $('.meal').show();
        // Remove detailed view
        $('#detailedView').remove();
      });
    });
      
      rowContainer.append($mealElement);
    }
  }
  
  async function getMealCategories() {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();
  
      if (data.categories) {
        displayCategories(data.categories);
      }
    } catch (error) {
      console.error(`Error fetching categories: ${error.message}`);
    }
  }
  
  // Function to display categories
  function displayCategories(categories) {
    const rowContainer = $("#rowData");
  
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const categoryElement = `
        <div class="col-md-3">
          <div onclick="getCategoryMeals('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${category.strCategoryThumb}" alt="${category.strCategory}" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${category.strCategory}</h3>
              <p>${category.strCategoryDescription}</p>
            </div>
          </div>
        </div>
      `;
  
      const $categoryElement = $(categoryElement);
      //$categoryElement.find('.meal-layer').hide(); // Initially hide category layer
  
      // Add click event to show detailed view
      $categoryElement.click(function() {
        // Hide other category elements
        $('.meal').not(this).hide();
        
        // Display detailed view
        const detailedView = `
        
        `;
  
        // Append detailed view to the row container
        rowContainer.append(detailedView);
        
        // Add click event to close button
        $('#closeButton').click(function() {
          // Show all category elements
          $('.meal').show();
  
          // Remove detailed view
          $('#detailedView').remove();
        });
      });
  
      rowContainer.append($categoryElement);
    }
  }
  
  // Function to fetch and display meals based on the selected category
  async function getCategoryMeals(category) {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
  
      if (data.meals) {
        displayMealsWithDetails(data.meals)      }
    } catch (error) {
      console.error(`Error fetching meals by category: ${error.message}`);
    }
  }
  
   
  

  // Function to fetch and display areas
async function getAreas() {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const data = await response.json();
  
      if (data.meals) {
        displayAreas(data.meals);
      }
    } catch (error) {
      console.error(`Error fetching areas: ${error.message}`);
    }
  }
  
  // Function to display areas
  function displayAreas(areas) {
    const rowContainer = $("#rowData");
  
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      const areaElement = `
        <div class="col-md-3">
          <div onclick="getAreaMeals('${area.strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${area.strArea}</h3>
          </div>
        </div>
      `;
  
      const $areaElement = $(areaElement);
      $areaElement.find('.meal-layer').hide(); // Initially hide area layer
  
      // Add click event to show detailed view
      $areaElement.click(function() {
        // Hide other area elements
        $('.rounded-2').not(this).hide();
  
        // Display detailed view
        const detailedView = `
          <!-- Detailed view HTML code here -->
        `;
  
        // Append detailed view to the row container
        rowContainer.append(detailedView);
  
        // Add click event to close button
        $('#closeButton').click(function() {
          // Show all area elements
          $('.rounded-2').show();
  
          // Remove detailed view
          $('#detailedView').remove();
        });
      });
  
      rowContainer.append($areaElement);
    }
  }
  
  



  // Function to fetch and display meals based on the selected area
  async function getAreaMeals(area) {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      const data = await response.json();
  
      if (data.meals) {
        displayMealsWithDetails(data.meals);
      }
    } catch (error) {
      console.error(`Error fetching meals by area: ${error.message}`);
    }
  }
  
  async function displayMealsWithDetails(meals) {
    const rowContainer = $("#rowData");
  
    for (let i = 0; i < meals.length; i++) {
      const meal = meals[i];
  
      try {
        const lookupResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
        const lookupData = await lookupResponse.json();
  
        if (lookupData.meals && lookupData.meals.length > 0) {
          const detailedMeal = lookupData.meals[0];
          const mealElement = `
            <div class="col-md-3">
              <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${detailedMeal.strMealThumb}" alt="${detailedMeal.strMeal}" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                  <h3>${detailedMeal.strMeal}</h3>
                </div>
              </div>
            </div>
          `;
  
          const $mealElement = $(mealElement);
          $mealElement.find('.meal-layer').hide(); // Initially hide meal layer
  
          // Add click event to show detailed view
          $mealElement.click(function() {
            // Hide other meal elements
            $('.meal').not(this).hide();
  
            // Display detailed view
            const detailedView = `
              <div class="row py-5 g-4" id="detailedView">
                <div class="col-md-4">
                  <img class="w-100 rounded-3" src="${detailedMeal.strMealThumb}" alt="${detailedMeal.strMeal}">
                  <h2>${detailedMeal.strMeal}</h2>
                </div>
                <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p>${detailedMeal.strInstructions}</p>
                  <h3><span class="fw-bolder">Area : </span>${detailedMeal.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${detailedMeal.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${generateIngredientsList(detailedMeal)}
                  </ul>
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${generateTagsList(detailedMeal)}
                  </ul>
                  <a target="_blank" href="${detailedMeal.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${detailedMeal.strYoutube}" class="btn btn-danger">Youtube</a>
                  <button class="btn btn-danger close-btn z-ind">Close</button>
                </div>
              </div>
            `;
  
            // Append detailed view to the row container
            rowContainer.append(detailedView);
  
            // Add click event to close button
            $('.close-btn').click(function() {
              // Show all meal elements
              $('.meal').show();
              // Remove detailed view
              $('#detailedView').remove();
            });
          });
  
          rowContainer.append($mealElement);
        }
      } catch (error) {
        console.error(`Error fetching meal details: ${error.message}`);
      }
    }
  }

// Function to get Ingredients list 
async function getIngredientsList() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
  
      if (data.meals) {
        const limitedIngredients = data.meals.slice(0, 20); // Limit to 20 ingredients
        displayIngredientsList(limitedIngredients);
      }
    } catch (error) {
      console.error(`Error fetching Ingredients list: ${error.message}`);
    }
  }
  
  // Function to display Ingredients list
  function displayIngredientsList(ingredients) {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const description = ingredient.strDescription ? truncateDescription(ingredient.strDescription, 20) : '';
      const ingredientElement = `
        <div class="col-md-3">
          <div class="rounded-2 text-center cursor-pointer" onclick="getIngredientsMeals('${ingredient.strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${ingredient.strIngredient}</h3>
            <p>${description}</p>
          </div>
        </div>
      `;
  
      rowContainer.append(ingredientElement);
    }
  }
  
  // Function to truncate description to a specified word limit
  function truncateDescription(description, wordLimit) {
    const words = description.split(' ');
    const truncatedWords = words.slice(0, wordLimit);
    return truncatedWords.join(' ');
  }
  
  // Function to get meals based on ingredient
  async function getIngredientsMeals(ingredient) {
    const rowContainer = $("#rowData");
    rowContainer.empty(); // Clear existing meals
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
  
      if (data.meals) {
        displayMealsWithDetails(data.meals);
      }
    } catch (error) {
      console.error(`Error fetching meals by ingredient: ${error.message}`);
    }
  }
  

  
  function getIngredients() {
    $('#searchContainer').hide();
    getIngredientsList();    
    console.log("Getting ingredients");
}


$(document).ready(function () {



// Click event for open-close-icon to toggle side nav
$(".open-close-icon").click(function () {
if ($(".side-nav-menu").css("left") === "0px") {
closeSideNav();
} else {
openSideNav();
}
});

// Click events for each menu item
$("li[data-menu]").click(function () {
var menuItem = $(this).data("menu");
switch (menuItem) {
case "search":
  showSearchInputs();
  break;
case "categories":
  getCategories();
  break;
case "area":
  getArea();
  break;
case "ingredients":
  getIngredients();
  break;
case "contact":
  showContacts();
  break;
default:
  break;
}
closeSideNav();
});
});

function inputsValidation(input) {
    const inputId = input.id;

    switch (inputId) {
        case 'nameInput':
            validateName(input);
            break;
        case 'emailInput':
            validateEmail(input);
            break;
        case 'phoneInput':
            validatePhone(input);
            break;
        case 'ageInput':
            validateAge(input);
            break;
        case 'passwordInput':
            validatePassword(input);
            break;
        case 'repasswordInput':
            validateRepassword(input);
            break;
        default:
            break;
    }
}

function validateName(input) {
    const nameAlert = document.getElementById('nameAlert');
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(input.value)) {
        nameAlert.classList.remove('d-none');
    } else {
        nameAlert.classList.add('d-none');
    }
}

function validateEmail(input) {
    const emailAlert = document.getElementById('emailAlert');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(input.value)) {
        emailAlert.classList.remove('d-none');
    } else {
        emailAlert.classList.add('d-none');
    }
}

function validatePhone(input) {
    const phoneAlert = document.getElementById('phoneAlert');
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(input.value)) {
        phoneAlert.classList.remove('d-none');
    } else {
        phoneAlert.classList.add('d-none');
    }
}

function validateAge(input) {
    const ageAlert = document.getElementById('ageAlert');
    const ageRegex = /^[0-9]+$/;

    if (!ageRegex.test(input.value)) {
        ageAlert.classList.remove('d-none');
    } else {
        ageAlert.classList.add('d-none');
    }
}

function validatePassword(input) {
    const passwordAlert = document.getElementById('passwordAlert');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(input.value)) {
        passwordAlert.classList.remove('d-none');
    } else {
        passwordAlert.classList.add('d-none');
    }
}

function validateRepassword(input) {
    const repasswordAlert = document.getElementById('repasswordAlert');
    const passwordInput = document.getElementById('passwordInput');

    if (input.value !== passwordInput.value) {
        repasswordAlert.classList.remove('d-none');
    } else {
        repasswordAlert.classList.add('d-none');
    }
}

function showContacts() {
    closeSideNav();
    const contactSection = document.getElementById('contact');
    if (contactSection.classList.contains('d-none')) {
        contactSection.classList.remove('d-none');
    } else {
        contactSection.classList.add('d-none');
    }
}
