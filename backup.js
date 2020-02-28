geocodeUrl() {

  const url = 'http://localhost:3001/with-cors';
  const data = { username: 'example' };

  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

  // const geoPromise = new Promise((resolve, reject) => {
  //   request.post({ url: 'http://localhost:3000/with-cors', formData: {a: 234} }, function optionalCallback(err, httpResponse, body) {
  //     if (err) {
  //       return console.error('upload failed:', err);
  //     }
  //     console.log('Upload successful!  Server responded with:', body);
  //   });
  //   // request({
  //   //     url: 'http://localhost:3000/with-cors',
  //   //     json: true
  //   // }, (error, response, body) => {
  //   //     if (error) {
  //   //         reject("Could not connect to Google servers.");
  //   //     } else if (body.status === "ZERO_RESULTS") {
  //   //         reject("Unable to find the address.");
  //   //     } else if (body.status === "OK") {
  //   //         resolve(body);
  //   //     }
  //   // });

  // });

  // return geoPromise;
}

// readDayFn = () => {
//   axios.post('http://localhost:3000/with-cors', {
//     date: "16.07.2019"
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
// addBuyWithoutFn() {
//   axios.post('http://localhost:3000/without-cors', {
//     "shop name": 'REWE',
//     "pay method": 'credit card'
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// Performing multiple concurrent requests
// function getUserAccount() {
//   return axios.get('/user/12345');
// }

// function getUserPermissions() {
//   return axios.get('/user/12345/permissions');
// }

// axios.all([getUserAccount(), getUserPermissions()])
//   .then(axios.spread(function (acct, perms) {
//     // Both requests are now complete
//   }));