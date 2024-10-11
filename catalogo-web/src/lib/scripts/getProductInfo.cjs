/*
RUN COMMAND

node src/lib/scripts/getProductInfo.cjs

*/

// var myHeaders = new Headers();
const fs = require("fs");
const fetch = require("node-fetch");
var myHeaders = new fetch.Headers();

myHeaders.append(
  "Authorization",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7IklEIjo2LCJWQ0hBX05PTUJSRSI6Ikpvc2UgUGFibG8gQ2lzbmVyb3MgTG9wZXoiLCJWQ0hBX1BBU1NXT1JEIjoiJDJiJDEwJFlMSmI5dVcvcEcwdFZLLnZ0Nmovdk9uUWVxY3c5TG1pT3FXeTF5ZVA0ZEovcy9FY01DNkwyIiwiVkNIQV9DT1JSRU8iOiJqb3NlLmNpc25lcm9zQGNhbnRpYS5teCIsIkRBVEVfRkVDSEFfUkVHSVNUUk8iOiIyMDIzLTAyLTIxVDE3OjM4OjUzLjAwMFoiLCJWQ0hBX1NUQVRVUyI6IkFDVElWTyIsImNyZWF0ZWRBdCI6IjIwMjMtMDItMjFUMTc6Mzg6NTMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMjFUMTc6Mzg6NTMuMDAwWiJ9LCJpYXQiOjE3MjYyNTA2MzgsImV4cCI6MTcyNjI5MzgzOH0.Sw5ZhiYh7QpbUPLQtkN9mWjTJymK3e1iA9Mg76tJgrw",
);
myHeaders.append("Cookie", "JSESSSIONID=977667082.1.1859204592.674076672");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://mivianney-service.vianney.com.mx/api/producto", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const jsonResult = JSON.parse(result);
    let mappedProducts = {};
    const products = jsonResult.cont.productos;
    for (const product of products) {
      mappedProducts[product.Id] = product;
    }

    const path = `./src/lib/scripts/generated.json`;
    fs.writeFileSync(path, JSON.stringify(mappedProducts, null, 2));
  })
  .catch((error) => console.error("error", error));
