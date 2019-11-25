var arr = [{
     id: 1,
     name: 'John',
}, {
     id: 2,
     name: 'Mary',
}, {
     id: 3,
     name: 'Andrew',
}];

function sortBy(array, key) {
     var sorted = [];
     sorted = sorted.concat(array);
     sorted.sort(function (a, b) {
          if (a[key] < b[key]) {
               return -1;
          }
          if (a[key] > b[key]) {
               return 1;
          }
          return 0;
     });
     return sorted;
}

var sorted = sortBy(arr, 'name');
console.log(sorted);