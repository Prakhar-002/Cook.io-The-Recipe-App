/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

/*
?   Import...
*/

import { fetchData } from "./api.js";
import { skeletonCard , cardQueries} from "./global.js";
import { getTime } from "./module.js";


/*
* Home Page Search...
*/

const /* {NODE ELEMENT} */ searchField = document.querySelector("[data-search-field]");
const /* {NODE ELEMENT} */ searchBtn = document.querySelector("[data-search-btn]");

searchBtn.addEventListener("click", function() {
      if(searchField.value) {
            window.location = `/recipes.html?q=${searchField.value}`;
      }
});


/*
* Search submit on Enter...
*/

searchField.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
            searchBtn.click();
      }
});


/*
* Tab panel navigation...
*/

const /* {NODE List} */ tabButtons = document.querySelectorAll("[data-tab-btn]");
const /* {NODE List} */ tabPanels = document.querySelectorAll("[data-tab-panel]");

let /* {NODE ELEMENT} */ [lastActiveTabPanel] = tabPanels;
let /* {NODE ELEMENT} */ [lastActiveTabBtn] = tabButtons;

addEventOnElements(tabButtons, "click", function() {
      lastActiveTabPanel.setAttribute("hidden", "");
      lastActiveTabBtn.setAttribute("aria-selected", false);
      lastActiveTabBtn.setAttribute("tab-index", -1);

      const /* {Node Element} */ currentTabPanel = document.querySelector(`#${this.getAttribute("aria-controls")}`);
      currentTabPanel.removeAttribute("hidden");
      this.setAttribute("aria-selected", true);
      this.setAttribute("tabindex", 0);

      lastActiveTabPanel = currentTabPanel;
      lastActiveTabBtn =  this;

      addTabContent(this, currentTabPanel);
});


/*
* Navigate tab with arrow key...
*/

addEventOnElements(tabButtons, "keydown", function(e){

      const /* {Node Element} */ nextElement = this.nextElementSibling;
      const /* {Node Element} */ previousElement = this.previousElementSibling;

      if(e.key === "ArrowRight" && nextElement) {
            this.setAttribute("tabindex", -1);
            nextElement.setAttribute("tabindex", 0);
            nextElement.focus();
      } else if (e.key === "ArrowLeft" && previousElement) {
            this.setAttribute("tabindex", -1);
            previousElement.setAttribute("tabindex", 0);
            previousElement.focus();
      } else if (e.key === "Tab") {
            this.setAttribute("tabindex", -1);
            lastActiveTabBtn.setAttribute("tabindex", 0);
      }

});


/*
*  WORK WITH API...
*  Fetch data for Tab content...
*/

const addTabContent = ( currentTabBtn, currentTabPanel ) => {

      const /* {Node Elements} */ gridList = document.createElement("div");
      gridList.classList.add("grid-list");

      currentTabPanel.innerHTML = `
            <div class="grid-list">
                  ${skeletonCard.repeat(12)}
            </div>
      `;

      fetchData([['mealType', currentTabBtn.textContent.trim().toLowerCase()], ["cuisineType", "indian"], ...cardQueries], function (data) {

            currentTabPanel.innerHTML = "";

            for ( let i = 0; i < 12 ; i++) {

                  const {
                        recipe : {
                              image,
                              label : title,
                              totalTime : cookingTime,
                              uri
                        }
                  } = data.hits[i];

                  const /* {String} */ recipeId = uri.slice(uri.lastIndexOf("_") + 1);
                  const /* {undefined || String} */ isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);

                  const /* {Node Element } */ card = document.createElement("div");
                  card.classList.add("card");
                  card.style.animationDelay = `${100 * i}ms`;

                  card.innerHTML = `
                        <figure class="card-media img-holder">
                              <a href="./detail.html?recipe=${recipeId}">
                                    <img src="${image}" 
                                          alt="${title}" 
                                          class="img-cover"
                                          loading="lazy"
                                          width="195"
                                          height="195"
                                          >
                              </a>
                        </figure>

                        <div class="card-body">

                              <h3 class="title-small">
                                    <a href="./detail.html?recipe=${recipeId}" class="card-link">${title ?? "Untitled"}</a>
                              </h3>

                              <div class="meta-wrapper">

                                    <div class="meta-item">
                                          <span class="material-symbols-outlined" aria-hidden="true">schedule</span>

                                          <spam class="label-medium">${getTime(cookingTime).time || "<1"} ${getTime(cookingTime).timeUnit}</spam>
                                    </div>

                                    <button class="icon-btn has-state ${isSaved ? "saved" : "removed"}" aria-label="Add to saved recipes" onclick="saveRecipe(this, '${recipeId}')">
                                          <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>

                                          <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
                                    </button>

                              </div>

                        </div>
                  `;

                  gridList.appendChild(card);

            }

            currentTabPanel.appendChild(gridList);

            currentTabPanel.innerHTML += `
                  <a href="./recipes.html?mealType=${currentTabBtn.textContent.trim().toLowerCase()}&cuisineType=indian" class="btn btn-secondary label-large has-state">Show More</a>
            `;

      });
}

addTabContent(lastActiveTabBtn, lastActiveTabPanel);

/*
*  Fetch data for slider Card...
*/

let /* {Array} */ cuisineType = ["indian", "chinese", "korean", "asian"];

const /* {NodeList} */ sliderSections = document.querySelectorAll("[data-slider-section]");

for (const [index, sliderSection] of sliderSections.entries()) {

      sliderSection.innerHTML = `
            <div class="container">
                  <h2 class="section-title headline-small" id="slider-label-1">Latest ${cuisineType[index]} Recipes</h2>

                  <div class="slider">
                        <ul class="slider-wrapper" data-slider-wrapper>
                              ${`<li class="slider-item">${skeletonCard}</li>`.repeat(10)}
                        </ul>
                  </div>

            </div>
      `;

      const /* {NodeList} */ sliderWrapper = sliderSection.querySelector("[data-slider-wrapper]");

      fetchData([...cardQueries, ["cuisineType", cuisineType[index]]], function (data) {

            sliderWrapper.innerHTML = "";

            data.hits.map((item) => {

                  const {
                        recipe : {
                              image,
                              label : title,
                              totalTime : cookingTime,
                              uri
                        }
                  } = item;

                  const /* {String} */ recipeId = uri.slice(uri.lastIndexOf("_") + 1);
                  const /* {undefined || String} */ isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);

                  const /* {NodeList} */ sliderItem = document.createElement("li");
                  sliderItem.classList.add("slider-item");

                  sliderItem.innerHTML = `
                        <div class="card">
                              <figure class="card-media img-holder">
                                    <a href="./detail.html?recipe=${recipeId}">
                                          <img src="${image}" 
                                                alt="${title}" 
                                                class="img-cover"
                                                loading="lazy"
                                                width="195"
                                                height="195"
                                                >
                                    </a>
                              </figure>

                              <div class="card-body">

                                    <h3 class="title-small">
                                          <a href="./detail.html?recipe=${recipeId}" class="card-link">${title ?? "Untitled"}</a>
                                    </h3>

                                    <div class="meta-wrapper">

                                          <div class="meta-item">
                                                <span class="material-symbols-outlined" aria-hidden="true">schedule</span>

                                                <spam class="label-medium">${getTime(cookingTime).time || "<1"} ${getTime(cookingTime).timeUnit}</spam>
                                          </div>

                                          <button class="icon-btn has-state ${isSaved ? "saved" : "removed"}" aria-label="Add to saved recipes" onclick="saveRecipe(this, '${recipeId}')">
                                                <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>

                                                <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
                                          </button>

                                    </div>

                              </div>
                        </div>
                  `;

                  sliderWrapper.appendChild(sliderItem);

            });

            sliderWrapper.innerHTML +=`
                  <li class="slider-item" data-slider-item>
                        <a href="./recipes.html?cuisineType=${cuisineType[index].toLowerCase()}&cuisineType=indian" class="load-more-card has-state">
                              <span class="label-large">Show More</span>

                              <span class="material-symbols-outlined bookmark-add" aria-hidden="true">navigate_next</span>
                        </a>
                  </li>
            `;

      });

}