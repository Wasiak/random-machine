

var items = [];

items = [];

var results;


let form = document.getElementById('form')
let users = document.getElementById('users')
let infoContainer = document.getElementById('info-container')
let info = document.createElement('p')



const refreshUsers = () => {
  users.innerHTML = ""
  infoContainer.innerHTML =""
  items.map(item => {
    const user= document.createElement('p')
    user.classList.add('users__acapit')
    user.innerHTML = item
    users.appendChild(user)
  })
}

const addUser = (e) =>{
e.preventDefault()
let input = document.getElementById('form-input')
let inputValue = input.value

if (inputValue.length >2) {
  items.push(inputValue)
refreshUsers()
} else {
info.innerHTML = "please text more than 2 signs"
infoContainer.appendChild(info)
}
input.value= ""
}

var draw = function(items, current) {
  var result = items[~~(Math.random()* items.length)];
  if (result === current && items.length > 1) {
    result = draw(items, current);
  } else if (result === current && items.length <= 1) {
    result = 'drawAllAgain';
  }
  return result;
}

var drawAll = function () {
  var allItems = items.slice();
  var allItemsToDraw = items.slice();
  var currentResults = [];
  allItems.forEach(function(item) {
    var result = draw(allItemsToDraw, item);
    var index = allItemsToDraw.indexOf(result);
    if (index > -1) {
      allItemsToDraw.splice(index, 1);
    }
    currentResults.push(result);
  });
  if (currentResults[currentResults.length - 1] === 'drawAllAgain') {
    drawAll();
    return;
  }
  results = currentResults;
  var resultContainer = document.getElementById('results');
  var displayResults = '';
  
  allItems.forEach(function(elem , index) {
    displayResults += `<p class="results__acapit"><span>${elem}</span><img src="present.svg" alt="present"><img src="arrow.svg" alt="arrow"><span> ${results[index]}</span></p>`;
  });
  resultContainer.innerHTML = displayResults;
}

var button = document.getElementById('draw-button');
button.addEventListener('click', drawAll);
form.addEventListener('submit', addUser)
