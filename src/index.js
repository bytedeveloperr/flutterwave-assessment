const express = require("express");
const { requestHandler } = require("./utils");
const { errors, notFound } = require("./middlewares");
const { indexController, validateRuleController } = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", requestHandler(indexController));
app.post("/validate-rule", requestHandler(validateRuleController));

app.use("*", notFound());
app.use(errors());

app.listen(process.env.PORT, () => {
  console.log(`⚡ server running and listening on ${process.env.PORT}`);
});
