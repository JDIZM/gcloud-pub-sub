# gcloud-pub-sub

This project demonstrates how to work with Google Cloud Pub/Sub using Node.js, including publishing messages, listening for messages, and setting up Cloud Functions triggered by Pub/Sub events.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up Google Cloud credentials:

   - Run `gcloud init` to set up the project and credentials.
   - Alternatively, you can use one of these methods:

     ```zsh
     # Login as a user:
     gcloud auth application-default login

     # Set a service account as the default in your env:
     export GOOGLE_APPLICATION_CREDENTIALS=$HOME/path/to/your/gcloud.json
     ```

3. View active configurations:

   ```
   gcloud config list
   ```

4. Set your project:
   ```
   gcloud config set project YOUR_PROJECT_ID
   ```

## Pub/Sub Operations

### Create a Topic and Subscription

```zsh
gcloud pubsub topics create test-topic
gcloud pubsub subscriptions create test-sub-1 --topic test-topic
```

### Send a Message

To publish a message to the Pub/Sub topic:

```zsh
npm run send
```

This script uses `src/sendMessage.ts` to publish a message to the "test-topic" topic.

### Listen for Messages

To listen for messages on the subscription:

```zsh
npm run listen
```

This script uses `src/listen.ts` to listen for messages on the "test-sub-1" subscription and process them, including parsing CloudEvents.

## Cloud Functions

### Testing a Function Locally

1. Build the project:

   ```
   npm run build
   ```

2. Navigate to the function directory:

   ```
   cd dist/functions/events/helloWorld
   ```

3. Run the function locally:
   ```
   npx @google-cloud/functions-framework --target=myCloudEventFunction
   ```

This will start a local server at `http://localhost:8080/`.

### Sending a CloudEvent to a Local Function

Use the following code to send a CloudEvent to your local function:

```js
import { httpTransport, emitterFor, CloudEvent, CloudEventV1 } from "cloudevents";
const emit = emitterFor(httpTransport("http://localhost:8080/"));

const ce: CloudEventV1<string> = {
  specversion: "1.0",
  source: "/some/source",
  type: "example",
  id: "1234",
  data: JSON.stringify({ foo: "bar" })
};

const event = new CloudEvent(ce);

emit(event);
```

Run this code using:

```zsh
npm run dev
```

### Deploying a Function

To deploy your function to Google Cloud Functions, follow the [official deployment guide](https://cloud.google.com/functions/docs/deploy).

## Additional Resources

- [Google Cloud Pub/Sub Documentation](https://cloud.google.com/pubsub/docs)
- [Cloud Functions Documentation](https://cloud.google.com/functions/docs)
- [CloudEvents SDK for JavaScript](https://github.com/cloudevents/sdk-javascript)
- [Terraform Google Cloud Functions Resource](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloudfunctions_function)

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or find any bugs.

<!-- ## License

[Include your license information here] -->
