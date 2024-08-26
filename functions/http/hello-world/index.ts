import * as functions from "@google-cloud/functions-framework";

export const helloGET = functions.http("helloGET", (req, res) => {
  res.send("Hello World!");
});
