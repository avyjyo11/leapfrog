var input = {
     '1': {
          id: 1,
          name: 'John',
          children: [{
                    id: 2,
                    name: 'Sally'
               },
               {
                    id: 3,
                    name: 'Mark',
                    children: [{
                         id: 4,
                         name: 'Harry'
                    }]
               }
          ]
     },
     '5': {
          id: 5,
          name: 'Mike',
          children: [{
               id: 6,
               name: 'Peter'
          }, {
               id: 7,
               name: 'Parker'
          }]
     }
};

function solution(ip) {
     var op = {};
     for (key in ip) {
          var obj = ip[key];
          recursion(obj, op);
     }
     return op;
}

function recursion(obj, op) {
     var id2 = obj.id;
     op[id2] = {
          id: obj.id,
          name: obj.name
     }

     if (obj.children) {
          op[id2].children = obj.children.map(function (value) {
               return value.id;
          });
          obj.children.map(function (value) {
               for (key in value) {
                    if (value.id) {
                         recursion(value, op);
                    }
               }
          });
     }
}

var output = solution(input);
console.log(output);

// To this
// var output = {
//      '1': {
//           id: 1,
//           name: 'John',
//           children: [2, 3]
//      },
//      '2': {
//           id: 2,
//           name: 'Sally'
//      },
//      '3': {
//           id: 3,
//           name: 'Mark',
//           children: [4]
//      },
//      '4': {
//           id: 4,
//           name: 'Harry'
//      },
//      '5': {
//           id: 5,
//           name: 'Mike',
//           children: [6]
//      },
//      '6': {
//           id: 6,
//           name: 'Peter'
//      }
// };