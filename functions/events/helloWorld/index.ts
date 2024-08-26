import * as functions from "@google-cloud/functions-framework";

export const helloWorld = functions.cloudEvent("helloWorld", (cloudEvent) => {
  console.log("Hello, World!", cloudEvent);
});
