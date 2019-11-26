  var languages = ['js', 'c', 'c++', 'python', 'ruby', 'java', 'php', 'js', 'c', 'c++', 'python', 'ruby', 'java', 'js', 'c', 'c++', 'python', 'ruby', 'java'];

var task2obj = task2(languages);
var task1arr = task1(task2obj);

function task1(task2obj) {
     var arr = [];

     for (key in task2obj) {
          arr.push(key);
     }

     return arr;
}

function task2(languages) {
     var counts = {}

     languages.forEach(myFunction);

     function myFunction(item) {

          if (counts[item] > 0) {
               counts[item] = counts[item] + 1;
          } else {
               counts[item] = 1;
          }
     }
     return counts;
}

console.log(task1arr);
console.log(task2obj);