var items = [];

items = ['A', 'B', 'C', 'D', 'E'];

var results;

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
    displayResults += '<p><span>' + elem + '</span> --> <span>' + results[index] + '</span></p>';
  });
  resultContainer.innerHTML = displayResults;
}

var button = document.getElementById('draw-button');
button.addEventListener('click', drawAll);
