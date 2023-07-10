import { httpTransport, emitterFor, CloudEvent, CloudEventV1 } from "cloudevents";
// https://github.com/cloudevents/sdk-javascript

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
