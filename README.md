# gcloud-pub-sub

1. https://cloud.google.com/pubsub/docs/publish-receive-messages-client-library#pubsub-client-libraries-nodejs
2. https://cloud.google.com/functions/docs/calling/pubsub

- setup a cloudevent function that is triggered by a pubsub message / topic
- how to setup the folder structure
- how to deploy multiple functions instead of one via cli?
- adding terraform

see: https://cloud.google.com/functions/docs/running/function-frameworks#configuring_the_framework

also for a quick start guide deploying https://cloud.google.com/functions/docs/create-deploy-gcloud

### gcloud credentials

https://cloud.google.com/docs/authentication/provide-credentials-adc
https://cloud.google.com/docs/authentication/application-default-credentials

gcloud info

export GOOGLE_APPLICATION_CREDENTIALS=$HOME/gcloud.json

### testing a function locally

https://github.com/GoogleCloudPlatform/functions-framework-nodejs

Spin up a local development server for quick testing during development. The Functions Framework lets you run your functions in an environment that's similar to production, to speed up development and testing.

running the function locally; you need to cd into the dist folder and run the following command:

`npx @google-cloud/functions-framework --target=helloGET`

for the event

`npx @google-cloud/functions-framework --target=myCloudEventFunction`

send a post request to the endpoint with a cloud event.

### sending a cloudevent

Once we have the endpoint running locally, we can send a cloudevent to it either with a post request or by using.

https://github.com/cloudevents/sdk-javascript

```javascript
import { httpTransport, emitterFor, CloudEvent, CloudEventV1 } from "cloudevents";

// Create an emitter to send events to a receiver
const emit = emitterFor(httpTransport("http://localhost:8080/"));

// Create a new CloudEvent
const ce: CloudEventV1<string> = {
  specversion: "1.0",
  source: "/some/source",
  type: "example",
  id: "1234",
  data: JSON.stringify({ foo: "bar" })
};
const event = new CloudEvent(ce);

console.log(event);
// Send it to the endpoint - encoded as HTTP binary by default
emit(event);
```

### deploying a function

https://cloud.google.com/functions/docs/deploy

### terraform

https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloudfunctions_function
