import { PubSub } from "@google-cloud/pubsub";

const pubSubClient = new PubSub();
const topicName = "test-topic";

async function publishMessage() {
  const data = JSON.stringify({ message: "Hello, Pub/Sub!" });
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
}

publishMessage().catch(console.error);
