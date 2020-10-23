let items = [];
let results =[];

let form = document.getElementById('form')
let users = document.getElementById('users')
let infoContainer = document.getElementById('info-container')
let info = document.createElement('p')

const refreshUsers = () => {
  users.innerHTML = ""
  infoContainer.innerHTML =""
  items.map(({value,type}) => {
    const user= document.createElement('p')
    user.classList.add('users__name')
    user.innerHTML = type? `${value}<span class="users__type">${type}</span>` : value
    users.appendChild(user)
  })
}

const addUser = (e) =>{
  e.preventDefault()
  let input = document.getElementById('form-input')
  let inputValue = input.value
  let inputType = document.querySelector('.form__input-type')
  let inputTypeValue = inputType.value



  if (inputValue.length >2) {
    item = {'value': inputValue, 'type': inputTypeValue}
    items.push(item)
    refreshUsers()
    
  } else {
    info.innerHTML = "please text more than 2 signs"
    infoContainer.appendChild(info)
  }
  input.value= ""
  inputType.value=""
}

var draw = function(items, current) {
  
  var result = items[~~(Math.random()* items.length)];
  
  if (items.length > 1 && (result === current || result.type && result.type === current.type)) {
    result = draw(items, current);
  } else if ( items.length <= 1  && (result === current || result.type && result.type === current.type )){
    result = 'drawAllAgain';
  }
  return result;
}

var drawAll = function () {
  var allItems = items.slice();
  var allItemsToDraw = items.slice();
  var currentResults = []; 
  const firstType = allItems[0].type
  let sameTypes =false

  firstType && ((allItems.filter(({type}) => type===firstType)).length) === allItems.length && (sameTypes=true)

  if(sameTypes){
    info.innerHTML = "all types are the same, can't draw!";
  infoContainer.appendChild(info)
return}
    
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
    if(results[index].type ){
      elem.type ? (displayResults +=  `<p class="results__acapit"><span>${elem.value}(${elem.type})</span><img src="present.svg" alt="present"><img src="arrow.svg" alt="arrow"><span> ${results[index].value} (${results[index].type})</span></p>`) : displayResults +=  `<p class="results__acapit"><span>${elem.value}</span><img src="present.svg" alt="present"><img src="arrow.svg" alt="arrow"><span> ${results[index].value} (${results[index].type})</span></p>`      
    } else if (!results[index].type){
      elem.type ? (displayResults +=  `<p class="results__acapit"><span>${elem.value}(${elem.type})</span><img src="present.svg" alt="present"><img src="arrow.svg" alt="arrow"><span> ${results[index].value} </span></p>`) : displayResults +=  `<p class="results__acapit"><span>${elem.value}</span><img src="present.svg" alt="present"><img src="arrow.svg" alt="arrow"><span> ${results[index].value}</span></p>` 
    }

  });
  resultContainer.innerHTML = displayResults;
}

var button = document.getElementById('draw-button');
button.addEventListener('click', drawAll);
form.addEventListener('submit', addUser)
