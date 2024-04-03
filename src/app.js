
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const authRouter = require("./routes/auth.route");
const dataRouter = require("./routes/data.route");
const { ROUTE_404_ERROR } = require('./middlewares/errors/ApiError');
const message = require('./constants/messages.constant');
const swagger = require('./config/swagger');
const app = express();

app.use(cors())

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use( responseTime(async(req, res, time) => {
//   const Chalk = await import('chalk'),
//   chalk = new Chalk.Chalk()
 
//   console.log(chalk.redBright(req.method), " - ", chalk.yellowBright(req.url), " - ", chalk.greenBright(time));
 
// })) 
swagger(app)
app.use("/auth", authRouter);
app.use("/data", dataRouter);

// catch 404 
app.all("*", () => {
  throw new ROUTE_404_ERROR();
});
// error handler

app.use(function (err, _req, res, _next) {
  res.setHeader("Content-Type", "application/json");
  console.log({THEERROR: err});
  if (!err.statusCode) {
    
    err.message = message.ERROR_500.message;
  }

  if (err.name && err.name == "validation error") {
    err.statusCode = 400;
    err.message = err.message.replace("ValidationError: ", "");
  }
  console.log({err});
  return res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app;
 