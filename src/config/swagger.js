const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require("path");

let routes = path.join(__dirname, "../routes/*.route.js")
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Carbon Cell Backend Developer Assessment API",
        version: "1.0.0",
       
        description: "This API serves as the backend solution for the Carbon Cell Backend Developer Assessment. It includes various functionalities such as user authentication with JWT, API endpoints for data retrieval, Swagger documentation integration, secure access for authenticated users, and optional Ethereum account balance retrieval using web3.js.",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
       
        contact: {
          name: "Abdulbasit Damililola Alabi",
          url: "https://x.com/_strangedev_",
          email: "abdulbasitdamilola6@gmail.com",
        },
      },
      servers: [
        {
          url: process.env.URL,
        },
      ],
    },
    apis: [routes],
  };
// const options = {
//   swaggerDefinition: {
//     restapi: '3.0.0',
//     info: {
//       title: 'My API',
//       version: '1.0.0',
//       description: 'My REST API',
//     },
   
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
 
//   apis: ['./routes/*.route.js'],
// }

var option = {
    // explorer: true,
    swaggerOptions: {
        validatorUrl: null,
        // url: 'http://petstore.swagger.io/v2/swagger.json'
      }
  };
const specs = swaggerJsdoc(options)

module.exports = (app) => {
  app.get('/', (req, res)=>{
    res.redirect('/docs')
  })
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, option))
  app.get('/docs.json', (req,res)=>{
    res.setHeader("Content-Type", "application/json");
    res.send(specs)
  })
}