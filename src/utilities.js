const request = require('request');

const getJsonData = (url, callback) => {
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback("Unable to connect to the server.", null);
    } else {
      callback(null, data);
    }
    // else if (body.error) {
    //   callback("Unable to find location the server.", undefined);
  });
};



function getRequest(url) {

  // const getPromise = new Promise((resolve, reject) => {

  const Http = new XMLHttpRequest();

  console.log('Http readyState - Http: ', Http.readyState);

  Http.open("GET", url);

  console.log('Http readyState - open(): ', Http.readyState);

  Http.send();

  console.log('Http readyState - send(): ', Http.readyState);

  Http.onreadystatechange = (e) => {

    console.log('Http readyState - onChange: ', Http.readyState);
    console.log('Http.responseText > ', Http.responseText);

    // resolve(Http.readyState);
  }

  return Http;

  // });

  // return getPromise.then(result => {
  //   console.log('Http readyState - then: ', result);
  //   return result;
  // })
  // .catch(error => {
  //   console.log("error >> ", error);
  //   return error;
  // });
}

const sortNumbers = (current, next) => {
  const currentNumber = Number(current);
  const nextNumber = Number(next);

  return currentNumber - nextNumber;
}

module.exports = {
  getJsonData,
  sortNumbers
};