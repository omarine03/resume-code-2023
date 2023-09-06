"use strict";

(function() {
    
window.addEventListener("load", init);

function init() {
    id("get_facts").addEventListener("click", getCatFact);
    document.body.style.backgroundImage = `url(https://placekitten.com/${screen.width}/${screen.height})`;
}

function getCatFact() {
    let numberOfFacts = qs("select").value;
    let url = `https://meowfacts.herokuapp.com/?count=${numberOfFacts}`;
    fetch(url)
        .then(statusCheck)
        .then((response) => response.json())
        .then(processCatFact) // This is our function to put data on page.
        .catch(numberError);
}


function processCatFact(numberResponse) {
    let numberOfFacts = qs("select").value;
    let catFact = id("cat_fact");
    id("clickButton").textContent = "Click again for more fun cat facts!"

    let currentLis = qsa("li");
    console.log(currentLis);
    for (let i=0; i<currentLis.length; i++) {
        currentLis[i].remove();

    }

    for (let i=0; i<numberOfFacts; i++) {
        let newChild = document.createElement("li");
        newChild.textContent = `${numberResponse.data[i]}`;
        newChild.classList.add("numFact");
        catFact.appendChild(newChild);
    }
}

function numberError(error) {
    console.log(error);
}

/////////////////////////////////////////////////////////////////////
// Helper functions

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

function id(id) {
    return document.getElementById(id);
}
  
function qs(selector) {
    return document.querySelector(selector);
}
  
function qsa(selector) {
    return document.querySelectorAll(selector);
}
})();