import { PubSub, Message } from "@google-cloud/pubsub";

const pubSubClient = new PubSub();
// gcloud pubsub topics create test-topic
// gcloud pubsub subscriptions create test-sub-1 --topic test-topic
const subscriptionName = "test-sub-1";

async function listenForMessages() {
  const subscription = pubSubClient.subscription(subscriptionName);

  try {
    console.log(`Listening for messages on ${subscriptionName}...`);

    const messageHandler = (message: Message) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);

      // Parse the message data as a CloudEvent
      try {
        const cloudEvent = JSON.parse(message.data.toString());
        console.log(`\tCloudEvent Type: ${cloudEvent.type}`);
        console.log(`\tCloudEvent Source: ${cloudEvent.source}`);
        // Add more CloudEvent-specific processing here
      } catch (error) {
        console.error("Error parsing CloudEvent:", error);
      }

      // Acknowledge the message
      message.ack();
    };

    // Listen for new messages
    subscription.on("message", messageHandler);

    // Handle errors
    subscription.on("error", (error) => {
      console.error("Subscription error:", error);
    });

    // Keep the process running
    process.on("SIGINT", () => {
      console.log("Stopping listener...");
      subscription.removeListener("message", messageHandler);
      process.exit(0);
    });
  } catch (error) {
    console.error("Error setting up subscription:", error);
  }
}

// Start listening
listenForMessages().catch(console.error);
