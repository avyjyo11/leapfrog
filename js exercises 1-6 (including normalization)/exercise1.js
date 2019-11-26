function exe1(p) {
     for (var i = p - 1; i >= 0; i--) {
          var st = '*';
          for (var j = 0; j < i; j++) {
               st = st + '*';
          }
          console.log(st);
     }
}

exe1(5);