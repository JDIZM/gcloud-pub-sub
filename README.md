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

You can simply run `gcloud init` to setup the project and credentials.

view active configs: `gcloud config list`

- https://cloud.google.com/docs/authentication/provide-credentials-adc
- https://cloud.google.com/docs/authentication/application-default-credentials

get info for current env: `gcloud info`

Alternative ways to setup credentials:

```zsh
# login as a user:
gcloud auth application-default login

# set a service account as the default in your env:
export GOOGLE_APPLICATION_CREDENTIALS=$HOME/gcloud.json

# view env
# https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-linux
printenv | grep GOOGLE_APPLICATION_CREDENTIALS
```

When you login as a user with `gcloud auth application-default login` the credentials are stored in `~/.config/gcloud/application_default_credentials.json`

Check your user folder for config credentials:

`cd ~/.config/gcloud`

`cat application_default_credentials.json`

Show the projects that you have access to:

`gcloud projects list`

You can set the project that you want to use with the following command:

`gcloud config set project PROJECT_ID`

### testing a function locally

https://github.com/GoogleCloudPlatform/functions-framework-nodejs

Spin up a local development server for quick testing during development. The Functions Framework lets you run your functions in an environment that's similar to production, to speed up development and testing.

Lets test the function locally:

```
# Build the dist folder
`npm run build`

# cd into the event function folder
`cd dist/functions/events/helloWorld`

# run the following command:
`npx @google-cloud/functions-framework --target=myCloudEventFunction`

```

we now have an endpoint running on `URL: http://localhost:8080/` and we can send a post request to the endpoint with a cloud event.

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

Simply run `npm run dev` and the above code will send a cloudevent to the local endpoint.

```
Hello, World! {
  id: '1234',
  time: '2024-08-26T19:57:06.068Z',
  type: 'example',
  source: '/some/source',
  specversion: '1.0',
  data: { foo: 'bar' }
}
```

### deploying a function

https://cloud.google.com/functions/docs/deploy

### terraform

https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloudfunctions_function
