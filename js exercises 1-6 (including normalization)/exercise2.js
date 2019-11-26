var myinfo = {
     name: 'Abhishek Jyo Shrestha',
     address: 'Maitidevi',
     email: 'avy.jyo11@gmail.com',
     interests: 'programming, debugging',
     education: [{
          name: 'Bhanubhakta M H S S',
          enrolledDate: '2060'
     }, {
          name: 'United Academy',
          enrolledDate: '2070'
     }, {
          name: 'Kathmandu Eng College',
          enrolledDate: '2072'
     }]
}

myinfo.education.forEach(function (value) {
     console.log('Name: ' + value.name + ', Date: ' + value.enrolledDate);
});