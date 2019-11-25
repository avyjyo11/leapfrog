var fruits = [{
          id: 1,
          name: 'Banana',
          color: 'Yellow'
     },
     {
          id: 2,
          name: 'Apple',
          color: 'Red'
     }
]

function searchByName(fruits, str) {
     var saveIndex;
     fruits.forEach(function (value, index) {
          if (value.name == str) {
               saveIndex = index;
          }
     });

     return fruits[saveIndex];
}

function searchByKey(fruits, key, str) {
     var saveIndex;
     fruits.forEach(function (value, index) {
          if (value[key] == str) {
               saveIndex = index;
          }
     });

     return fruits[saveIndex];
}

var result1 = searchByName(fruits, 'Apple');
console.log(result1);

var result2 = searchByKey(fruits, 'color', 'Yellow');
console.log(result2);